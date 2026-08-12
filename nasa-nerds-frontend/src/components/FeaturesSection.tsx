const features = [
  {
    icon: '⚡',
    title: 'C++17 Core',
    color: '#00e5ff',
    desc: 'Compiled performance with zero runtime overhead. Direct system calls via /proc and /sys for sub-millisecond data reads.',
    detail: 'Uses modern C++17 features: structured bindings, std::filesystem, if constexpr, and fold expressions.',
  },
  {
    icon: '🖥️',
    title: 'Termbox2 Renderer',
    color: '#00ff88',
    desc: 'Pure TUI rendering engine. No ncurses, no dependencies. Unicode box-drawing characters for authentic UI.',
    detail: 'ASCII art graphs, real-time sparklines, and grid-based layout — all inside your terminal emulator.',
  },
  {
    icon: '💎',
    title: 'Ruby Scripting',
    color: '#ff3333',
    desc: 'Extend and customize via Ruby scripts. Themes, widgets, and custom commands all scriptable at runtime.',
    detail: 'IPC via Unix Domain Sockets. Ruby 3.2 runtime spawned via fork/exec. Safe sandboxed execution.',
  },
  {
    icon: '🔧',
    title: 'System Monitoring',
    color: '#ff8800',
    desc: 'CPU, memory, disk, and network tracking. Reads directly from /proc/stat, /proc/meminfo, /sys/class/net.',
    detail: 'Per-core utilization, process tree, I/O stats, interface traffic — refreshed every 500ms.',
  },
  {
    icon: '🌐',
    title: 'Network Panel',
    color: '#00e5ff',
    desc: 'Real-time network traffic graphs. Download/upload rates, ping, interface status, and IP info at a glance.',
    detail: 'Parses /proc/net/dev. Supports multiple interfaces. Graphs drawn in Unicode braille characters.',
  },
  {
    icon: '🔌',
    title: 'Unix Domain Sockets',
    color: '#7ecfef',
    desc: 'Secure IPC between C++ core and Ruby scripts. No network exposure. Fast POSIX-native communication.',
    detail: 'Bidirectional messaging. Theme reload, widget inject, and command forwarding — all via socket.',
  },
  {
    icon: '🎨',
    title: 'Theme Engine',
    color: '#ff8800',
    desc: 'JSON-based theme configuration. Dark, cyberpunk, matrix, and custom themes via Ruby scripts.',
    detail: 'Colors, borders, padding, and graph styles all configurable. Hot-reload without restart.',
  },
  {
    icon: '🏹',
    title: 'Arch Linux First',
    color: '#00ff88',
    desc: 'Optimized for Arch Linux. Tested on Ubuntu and Debian. AUR package coming soon.',
    detail: 'CMake build system. Single binary output. No system-wide installation required.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-16 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div style={{ color: '#2a5068', fontSize: '11px', letterSpacing: '0.3em', fontFamily: "'Share Tech Mono', monospace", marginBottom: '8px' }}>
            // FEATURES
          </div>
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#7ecfef',
              textShadow: '0 0 20px rgba(126,207,239,0.3)',
            }}
          >
            BUILT DIFFERENT
          </h2>
          <p style={{ color: '#2a5068', fontFamily: "'Share Tech Mono', monospace", fontSize: '13px', marginTop: '8px' }}>
            No Electron · No 3D · No sound effects · Just raw performance
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="panel p-4 group cursor-default transition-all"
              style={{
                animationDelay: `${i * 0.1}s`,
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = f.color + '44';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${f.color}15`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#0d2535';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <div
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: '13px',
                  color: f.color,
                  marginBottom: '8px',
                  textShadow: `0 0 8px ${f.color}44`,
                }}
              >
                {f.title}
              </div>
              <p style={{ color: '#4a8fa8', fontSize: '11px', lineHeight: 1.6, fontFamily: "'Share Tech Mono', monospace", marginBottom: '8px' }}>
                {f.desc}
              </p>
              <p style={{ color: '#1a3545', fontSize: '10px', lineHeight: 1.5, fontFamily: "'Share Tech Mono', monospace" }}>
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
