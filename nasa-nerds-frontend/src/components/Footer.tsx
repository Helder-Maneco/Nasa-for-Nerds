export default function Footer() {
  return (
    <footer
      className="relative py-10 px-6 border-t"
      style={{ borderColor: '#0d2535', zIndex: 10 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '16px', color: '#00e5ff', marginBottom: '8px' }}>
              eDEX-CLI
            </div>
            <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: '#2a5068', lineHeight: 1.8 }}>
              TUI System Monitor inspirado no eDEX-UI.<br />
              Leve, rápido, dentro do terminal.<br />
              Sem Electron. Sem baboseiras.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '11px', color: '#7ecfef', marginBottom: '12px', letterSpacing: '0.1em' }}>
              LINKS
            </div>
            <div className="space-y-2">
              {[
                ['GitHub Repository', 'https://github.com/Helder-Maneco/EdexUI-version-Flix'],
                ['Issues & Bug Reports', 'https://github.com/Helder-Maneco/EdexUI-version-Flix/issues'],
                ['Original eDEX-UI', 'https://github.com/GitSquared/edex-ui'],
                ['Termbox2', 'https://github.com/jkuhlmann/termbox2'],
              ].map(([label, href]) => (
                <div key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '11px',
                      color: '#2a5068',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00ff88')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#2a5068')}
                  >
                    › {label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '11px', color: '#7ecfef', marginBottom: '12px', letterSpacing: '0.1em' }}>
              STACK
            </div>
            <div className="space-y-1.5">
              {[
                { label: 'C++17', color: '#00e5ff' },
                { label: 'CMake 3.16+', color: '#00e5ff' },
                { label: 'Termbox2', color: '#00ff88' },
                { label: 'Ruby 3.2', color: '#ff3333' },
                { label: 'Unix Domain Sockets', color: '#ff8800' },
                { label: 'Linux /proc & /sys', color: '#7ecfef' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ background: s.color }} />
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: '#2a5068' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#0d2535] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#1a3545' }}>
            © 2024 Helder Maneco · MIT License · Branch: Flix/production
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#1a3545' }}>
            Built with C++17 · No Electron was harmed in the making of this software
          </div>
        </div>
      </div>
    </footer>
  );
}
