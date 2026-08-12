const rows = [
  { feature: 'RAM Usage',        edexui: '~300MB',    edexcli: '<5MB',      winner: 'cli' },
  { feature: 'CPU Overhead',     edexui: '~8–15%',    edexcli: '<1%',       winner: 'cli' },
  { feature: 'Binary Size',      edexui: '~120MB',    edexcli: '<5MB',      winner: 'cli' },
  { feature: 'Startup Time',     edexui: '~8s',       edexcli: '<0.1s',     winner: 'cli' },
  { feature: 'Electron',         edexui: 'Yes ❌',    edexcli: 'No ✓',      winner: 'cli' },
  { feature: '3D Effects',       edexui: 'Yes',       edexcli: 'No',        winner: 'tie' },
  { feature: 'Sound Effects',    edexui: 'Yes',       edexcli: 'No',        winner: 'tie' },
  { feature: 'Scriptable',       edexui: 'JS',        edexcli: 'Ruby',      winner: 'tie' },
  { feature: 'Platform',         edexui: 'All',       edexcli: 'Linux',     winner: 'tie' },
  { feature: 'Real /proc data',  edexui: 'Electron',  edexcli: 'Native',    winner: 'cli' },
  { feature: 'Terminal native',  edexui: 'No',        edexcli: 'Yes ✓',     winner: 'cli' },
  { feature: 'SSH compatible',   edexui: 'No',        edexcli: 'Yes ✓',     winner: 'cli' },
];

export default function CompareSection() {
  return (
    <section className="relative py-16 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div style={{ color: '#2a5068', fontSize: '11px', letterSpacing: '0.3em', fontFamily: "'Share Tech Mono', monospace", marginBottom: '8px' }}>
            // COMPARISON
          </div>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#7ecfef' }}>
            eDEX-UI vs eDEX-CLI
          </h2>
          <p style={{ color: '#2a5068', fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', marginTop: '8px' }}>
            Same aesthetic. Zero the overhead.
          </p>
        </div>

        <div className="panel overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-3 border-b border-[#0d2535] px-4 py-3">
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '11px', color: '#2a5068' }}>FEATURE</div>
            <div className="text-center" style={{ fontFamily: "'Orbitron', monospace", fontSize: '11px', color: '#ff8800' }}>
              eDEX-UI
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#1a3545', fontWeight: 400 }}>Electron · 3D · Node.js</div>
            </div>
            <div className="text-center" style={{ fontFamily: "'Orbitron', monospace", fontSize: '11px', color: '#00ff88' }}>
              eDEX-CLI
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#1a3545', fontWeight: 400 }}>C++17 · TUI · Ruby</div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-3 px-4 py-2.5 border-b"
              style={{
                borderColor: '#091218',
                background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: '#4a8fa8' }}>
                {row.feature}
              </div>
              <div
                className="text-center"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '11px',
                  color: row.winner === 'cli' ? '#1a3545' : '#ff8800',
                }}
              >
                {row.edexui}
              </div>
              <div
                className="text-center"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '11px',
                  color: row.winner === 'cli' ? '#00ff88' : row.winner === 'tie' ? '#7ecfef' : '#1a3545',
                  textShadow: row.winner === 'cli' ? '0 0 6px rgba(0,255,136,0.4)' : 'none',
                }}
              >
                {row.edexcli}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#1a3545' }}>
              * Approximate values on typical Linux system
            </div>
            <div
              className="flex items-center gap-2"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#00ff88' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88' }} />
              Winner in 7/12 categories
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
