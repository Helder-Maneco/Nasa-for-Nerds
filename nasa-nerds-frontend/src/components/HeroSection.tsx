import { useState, useEffect } from 'react';

const TAGLINES = [
  'TUI System Monitor. No Electron. No Bloat.',
  'Real-time stats. Inside your terminal.',
  'C++17 Performance. Ruby Flexibility.',
  'Arch friendly. Blazing fast.',
  'The eDEX experience — reimagined for the CLI.',
];

const INSTALL_STEPS = [
  { cmd: 'git clone https://github.com/Helder-Maneco/EdexUI-version-Flix.git edex-cli', color: '#7ecfef' },
  { cmd: 'cd edex-cli', color: '#7ecfef' },
  { cmd: 'cmake -B build -DCMAKE_BUILD_TYPE=Release', color: '#7ecfef' },
  { cmd: 'cmake --build build --target edex-cli -j4', color: '#7ecfef' },
  { cmd: './build/src/edex-cli', color: '#00ff88' },
];

export default function HeroSection() {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [installStep, setInstallStep] = useState(0);
  const [installLines, setInstallLines] = useState<typeof INSTALL_STEPS>([]);
  const [showInstall, setShowInstall] = useState(false);

  // Tagline cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx(i => (i + 1) % TAGLINES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Typing effect for tagline
  useEffect(() => {
    const target = TAGLINES[taglineIdx];
    setTyped('');
    let i = 0;
    const interval = setInterval(() => {
      setTyped(target.slice(0, i + 1));
      i++;
      if (i >= target.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [taglineIdx]);

  // Install demo
  const runInstallDemo = () => {
    setShowInstall(true);
    setInstallLines([]);
    setInstallStep(0);
  };

  useEffect(() => {
    if (!showInstall) return;
    if (installStep < INSTALL_STEPS.length) {
      const timeout = setTimeout(() => {
        setInstallLines(prev => [...prev, INSTALL_STEPS[installStep]]);
        setInstallStep(s => s + 1);
      }, installStep === 0 ? 200 : 800);
      return () => clearTimeout(timeout);
    }
  }, [showInstall, installStep]);

  return (
    <section className="relative py-20 px-6 flex flex-col items-center text-center" style={{ zIndex: 10 }}>
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 mb-8 px-4 py-1.5"
        style={{ border: '1px solid #0d2535', background: 'rgba(9,18,24,0.8)', fontFamily: "'Share Tech Mono', monospace" }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88' }} />
        <span style={{ color: '#2a5068', fontSize: '11px', letterSpacing: '0.1em' }}>
          C++17 + TERMBOX2 + RUBY 3.2 — ARCH LINUX READY
        </span>
        <div className="w-2 h-2 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88' }} />
      </div>

      {/* Title */}
      <div className="relative mb-4">
        <h1
          className="font-black tracking-widest glitch-text"
          data-text="eDEX-CLI"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            color: '#00e5ff',
            textShadow: '0 0 20px rgba(0,229,255,0.5), 0 0 60px rgba(0,229,255,0.2)',
            lineHeight: 1,
          }}
        >
          eDEX-CLI
        </h1>
        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 'clamp(0.7rem, 2vw, 1rem)',
            color: '#2a5068',
            letterSpacing: '0.4em',
            marginTop: '8px',
          }}
        >
          VERSION FLIX — BY HELDER MANECO
        </div>
      </div>

      {/* Animated tagline */}
      <div
        className="mb-10 h-8 flex items-center justify-center"
        style={{ fontFamily: "'Share Tech Mono', monospace", color: '#7ecfef', fontSize: 'clamp(0.8rem, 2vw, 1.1rem)' }}
      >
        <span>{typed}</span>
        <span className="cursor-blink ml-0.5" style={{ color: '#00ff88' }}>█</span>
      </div>

      {/* Feature badges */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {[
          { label: 'C++17', icon: '⚡', color: '#00e5ff' },
          { label: 'Termbox2', icon: '🖥', color: '#00ff88' },
          { label: 'Ruby Scripting', icon: '💎', color: '#ff3333' },
          { label: '/proc & /sys', icon: '🔧', color: '#ff8800' },
          { label: 'Unix Sockets', icon: '🔌', color: '#7ecfef' },
          { label: 'No Electron', icon: '✓', color: '#00ff88' },
          { label: 'ASCII Graphs', icon: '📊', color: '#00e5ff' },
          { label: 'Arch Linux', icon: '🏹', color: '#00e5ff' },
        ].map(f => (
          <div
            key={f.label}
            className="flex items-center gap-1.5 px-3 py-1"
            style={{
              border: `1px solid ${f.color}22`,
              background: `${f.color}08`,
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '11px',
              color: f.color,
            }}
          >
            <span>{f.icon}</span>
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <a
          href="https://github.com/Helder-Maneco/EdexUI-version-Flix"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <button onClick={runInstallDemo} className="btn-secondary flex items-center gap-2">
          <span>▶</span>
          Quick Install
        </button>
        <a
          href="#demo"
          className="btn-secondary flex items-center gap-2"
          style={{ borderColor: '#ff8800', color: '#ff8800' }}
        >
          <span>◉</span>
          Live Demo
        </a>
      </div>

      {/* Install demo terminal */}
      {showInstall && (
        <div
          className="w-full max-w-2xl text-left panel p-4 fade-in"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#0d2535]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00ff88' }} />
            <span style={{ color: '#2a5068', fontSize: '10px', marginLeft: '8px' }}>bash — install edex-cli</span>
          </div>
          {installLines.map((line, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <span style={{ color: '#00ff88', fontSize: '12px' }}>$</span>
              <span style={{ color: line.color, fontSize: '12px' }}>{line.cmd}</span>
            </div>
          ))}
          {installStep === INSTALL_STEPS.length && (
            <div className="mt-2" style={{ color: '#00ff88', fontSize: '12px' }}>
              ✓ edex-cli initialized successfully
            </div>
          )}
          {installStep < INSTALL_STEPS.length && (
            <span className="cursor-blink" style={{ color: '#00ff88', fontSize: '12px' }}>█</span>
          )}
        </div>
      )}
    </section>
  );
}
