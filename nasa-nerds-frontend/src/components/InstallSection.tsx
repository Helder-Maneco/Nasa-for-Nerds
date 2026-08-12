import { useState } from 'react';

const distros = [
  {
    name: 'Arch Linux',
    icon: '🏹',
    color: '#00e5ff',
    steps: [
      '# Install dependencies',
      'sudo pacman -S cmake gcc termbox-git ruby',
      '',
      '# Clone and build',
      'git clone https://github.com/Helder-Maneco/EdexUI-version-Flix.git edex-cli',
      'cd edex-cli',
      'cmake -B build -DCMAKE_BUILD_TYPE=Release',
      'cmake --build build --target edex-cli -j$(nproc)',
      '',
      '# Run',
      './build/src/edex-cli',
    ],
  },
  {
    name: 'Ubuntu / Debian',
    icon: '🐧',
    color: '#ff8800',
    steps: [
      '# Install dependencies',
      'sudo apt install cmake g++ ruby-dev libncurses-dev',
      '',
      '# Build termbox2 from source',
      'git clone https://github.com/jkuhlmann/termbox2',
      'cd termbox2 && make && sudo make install && cd ..',
      '',
      '# Clone and build edex-cli',
      'git clone https://github.com/Helder-Maneco/EdexUI-version-Flix.git edex-cli',
      'cd edex-cli',
      'cmake -B build -DCMAKE_BUILD_TYPE=Release',
      'cmake --build build --target edex-cli -j4',
      '',
      '# Run',
      './build/src/edex-cli',
    ],
  },
  {
    name: 'From Source',
    icon: '⚙️',
    color: '#00ff88',
    steps: [
      '# Requirements:',
      '#   CMake 3.16+',
      '#   GCC 10+ or Clang 12+',
      '#   Ruby 3.0+',
      '#   Termbox2',
      '',
      '# Build options',
      'cmake -B build \\',
      '  -DCMAKE_BUILD_TYPE=Release \\',
      '  -DEDEX_RUBY_SUPPORT=ON \\',
      '  -DEDEX_ENABLE_THEMES=ON',
      '',
      'cmake --build build --target edex-cli -j4',
      '',
      '# Optional: install system-wide',
      'sudo cmake --install build',
      'edex-cli --help',
    ],
  },
];

const shortcuts = [
  { key: 'Q', desc: 'Quit edex-cli' },
  { key: 'T', desc: 'Cycle themes' },
  { key: 'H', desc: 'Show help panel' },
  { key: 'R', desc: 'Reload Ruby config' },
  { key: 'F', desc: 'Focus filesystem panel' },
  { key: 'N', desc: 'Focus network panel' },
  { key: '+/-', desc: 'Increase/decrease refresh rate' },
  { key: 'Tab', desc: 'Switch active panel' },
  { key: 'Esc', desc: 'Return to main view' },
];

export default function InstallSection() {
  const [activeDistro, setActiveDistro] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    const text = distros[activeDistro].steps.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="relative py-16 px-6" id="install" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center">
          <div style={{ color: '#2a5068', fontSize: '11px', letterSpacing: '0.3em', fontFamily: "'Share Tech Mono', monospace", marginBottom: '8px' }}>
            // INSTALLATION
          </div>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#7ecfef' }}>
            GET STARTED
          </h2>
        </div>

        {/* Distro tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {distros.map((d, i) => (
            <button
              key={d.name}
              onClick={() => setActiveDistro(i)}
              className="flex items-center gap-2 px-4 py-2 transition-all"
              style={{
                border: `1px solid ${activeDistro === i ? d.color : '#0d2535'}`,
                background: activeDistro === i ? `${d.color}10` : 'transparent',
                color: activeDistro === i ? d.color : '#2a5068',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: activeDistro === i ? `0 0 12px ${d.color}20` : 'none',
              }}
            >
              {d.icon} {d.name}
            </button>
          ))}
        </div>

        {/* Install steps */}
        <div className="panel p-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#0d2535]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00ff88' }} />
              <span style={{ color: '#2a5068', fontSize: '11px', fontFamily: "'Share Tech Mono', monospace", marginLeft: '8px' }}>
                bash — {distros[activeDistro].name} install
              </span>
            </div>
            <button
              onClick={copyInstall}
              style={{
                color: copied ? '#00ff88' : '#2a5068',
                fontSize: '11px',
                fontFamily: "'Share Tech Mono', monospace",
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
            >
              {copied ? '✓ Copied!' : '[ copy ]'}
            </button>
          </div>
          <div className="p-6 overflow-x-auto">
            {distros[activeDistro].steps.map((line, i) => (
              <div key={i} className="flex gap-3" style={{ minHeight: '20px' }}>
                {line.startsWith('#') ? (
                  <span style={{ color: '#2a5068', fontSize: '12px', fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.7 }}>
                    {line}
                  </span>
                ) : line === '' ? (
                  <span style={{ display: 'block', height: '8px' }} />
                ) : (
                  <>
                    <span style={{ color: '#00ff88', fontSize: '12px', fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.7, userSelect: 'none' }}>$</span>
                    <span style={{ color: '#7ecfef', fontSize: '12px', fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.7 }}>{line}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Keyboard shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '13px', color: '#00e5ff' }}>KEYBOARD SHORTCUTS</div>
              <div style={{ flex: 1, height: '1px', background: '#0d2535' }} />
            </div>
            <div className="panel p-4 space-y-2">
              {shortcuts.map(s => (
                <div key={s.key} className="flex items-center gap-3">
                  <kbd
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      background: '#091218',
                      border: '1px solid #0d2535',
                      color: '#00e5ff',
                      fontSize: '11px',
                      fontFamily: "'Share Tech Mono', monospace",
                      minWidth: 44,
                      textAlign: 'center',
                    }}
                  >
                    {s.key}
                  </kbd>
                  <span style={{ color: '#4a8fa8', fontSize: '12px', fontFamily: "'Share Tech Mono', monospace" }}>{s.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CLI flags */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '13px', color: '#ff8800' }}>CLI FLAGS</div>
              <div style={{ flex: 1, height: '1px', background: '#0d2535' }} />
            </div>
            <div className="panel p-4 space-y-2">
              {[
                ['--monitor', 'Start monitor mode (default)'],
                ['--theme <name>', 'Set color theme'],
                ['--ruby <file>', 'Load Ruby extension'],
                ['--refresh <ms>', 'Set refresh interval (ms)'],
                ['--no-net', 'Disable network panel'],
                ['--no-fs', 'Disable filesystem panel'],
                ['--no-kb', 'Disable keyboard panel'],
                ['--version', 'Print version info'],
                ['--help', 'Show help message'],
              ].map(([flag, desc]) => (
                <div key={flag} className="flex items-start gap-3">
                  <code
                    style={{
                      color: '#ff8800',
                      fontSize: '11px',
                      fontFamily: "'Share Tech Mono', monospace",
                      minWidth: 120,
                      flexShrink: 0,
                    }}
                  >
                    {flag}
                  </code>
                  <span style={{ color: '#4a8fa8', fontSize: '12px', fontFamily: "'Share Tech Mono', monospace" }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
