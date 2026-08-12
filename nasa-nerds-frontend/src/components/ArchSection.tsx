const ARCH_DIAGRAM = `
┌─────────────────────────────────────────────────────────┐
│                    eDEX-CLI ARCHITECTURE                  │
├─────────────────────────────────────────────────────────┤
│                                                           │
│   ┌──────────────┐    ┌──────────────┐                  │
│   │  C++17 CORE  │    │ RUBY ENGINE  │                  │
│   │              │◄──►│              │                  │
│   │  main.cpp    │    │  edex.rb     │                  │
│   │  monitor.cpp │    │  themes/*.rb │                  │
│   │  renderer.cpp│    │  plugins/*.rb│                  │
│   └──────┬───────┘    └──────┬───────┘                  │
│          │                   │                           │
│          │   Unix Domain     │                           │
│          └───── Socket ──────┘                           │
│                /tmp/edex.sock                            │
│                                                           │
│   ┌──────────────────────────────────────────────────┐   │
│   │              TERMBOX2 RENDERER                    │   │
│   │                                                   │   │
│   │  ┌─────────┐ ┌──────────┐ ┌────────┐ ┌────────┐ │   │
│   │  │  PANEL  │ │ TERMINAL │ │  PANEL │ │  NET   │ │   │
│   │  │ SYSTEM  │ │ MAIN SH  │ │  SHELL │ │ PANEL  │ │   │
│   │  └─────────┘ └──────────┘ └────────┘ └────────┘ │   │
│   │  ┌─────────────────────────────────────────────┐ │   │
│   │  │              FILESYSTEM PANEL               │ │   │
│   │  └─────────────────────────────────────────────┘ │   │
│   │  ┌─────────────────────────────────────────────┐ │   │
│   │  │               KEYBOARD PANEL                │ │   │
│   │  └─────────────────────────────────────────────┘ │   │
│   └──────────────────────────────────────────────────┘   │
│                                                           │
│   DATA SOURCES:  /proc/stat  /proc/meminfo               │
│                  /sys/class/net  /proc/net/dev           │
│                  /proc/[pid]/status                       │
└─────────────────────────────────────────────────────────┘
`;

const RUBY_EXAMPLE = `# ~/.config/edex-cli/themes/cyberpunk.rb
# Load via: edex-cli --ruby themes/cyberpunk.rb

EdexCLI::Theme.configure do |t|
  t.name       = "Cyberpunk 2077"
  t.bg_color   = :black
  t.fg_color   = :cyan
  t.accent     = "#ff00ff"
  t.border     = :magenta
  t.graph_char = "▓"
end

# Custom widget: Crypto ticker
EdexCLI::Widget.define(:crypto_ticker) do |w|
  w.title    = "CRYPTO"
  w.refresh  = 5000
  w.render do
    prices = fetch_prices(["BTC", "ETH"])
    prices.map { |sym, val| "#{sym}: $#{val}" }
  end
end

# Keyboard shortcut
EdexCLI::Shortcut.bind("C-t") do
  EdexCLI.theme.cycle!
end`;

const CPP_EXAMPLE = `// src/monitor.cpp — CPU monitoring
#include <fstream>
#include <vector>
#include <numeric>

struct CpuStat {
  uint64_t user, nice, system, idle,
           iowait, irq, softirq;
};

CpuStat read_cpu_stat(int core = -1) {
  std::ifstream f("/proc/stat");
  std::string line, label;
  
  while (std::getline(f, line)) {
    std::istringstream ss(line);
    ss >> label;
    
    bool match = (core < 0) 
      ? label == "cpu"
      : label == "cpu" + std::to_string(core);
    
    if (match) {
      CpuStat s;
      ss >> s.user >> s.nice >> s.system 
         >> s.idle >> s.iowait >> s.irq 
         >> s.softirq;
      return s;
    }
  }
  return {};
}

double cpu_usage_percent(
  const CpuStat& prev, 
  const CpuStat& curr
) {
  auto total_prev = prev.user + prev.nice + 
    prev.system + prev.idle;
  auto total_curr = curr.user + curr.nice + 
    curr.system + curr.idle;
  
  auto idle_delta = curr.idle - prev.idle;
  auto total_delta = total_curr - total_prev;
  
  return 100.0 * (1.0 - 
    static_cast<double>(idle_delta) / total_delta);
}`;

export default function ArchSection() {
  return (
    <section className="relative py-16 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Architecture diagram */}
        <div>
          <div className="text-center mb-8">
            <div style={{ color: '#2a5068', fontSize: '11px', letterSpacing: '0.3em', fontFamily: "'Share Tech Mono', monospace", marginBottom: '8px' }}>
              // ARCHITECTURE
            </div>
            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#7ecfef' }}>
              HOW IT WORKS
            </h2>
          </div>

          <div className="panel p-4 overflow-x-auto">
            <pre style={{ color: '#2a5068', fontSize: '11px', lineHeight: 1.5, fontFamily: "'Share Tech Mono', monospace" }}>
              {ARCH_DIAGRAM.split('').map((char, i) => {
                if ('┌─┐│└┘├┤┬┴┼►◄'.includes(char)) {
                  return <span key={i} style={{ color: '#00e5ff' }}>{char}</span>;
                }
                if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ/'.includes(char)) {
                  return <span key={i} style={{ color: '#7ecfef' }}>{char}</span>;
                }
                return <span key={i}>{char}</span>;
              })}
            </pre>
          </div>
        </div>

        {/* Code examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* C++ */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '13px', color: '#00e5ff' }}>C++ CORE</div>
              <div style={{ flex: 1, height: '1px', background: '#0d2535' }} />
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#2a5068' }}>monitor.cpp</div>
            </div>
            <div className="panel p-4 overflow-x-auto" style={{ maxHeight: 380 }}>
              <pre style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', lineHeight: 1.6 }}>
                {CPP_EXAMPLE.split('\n').map((line, i) => {
                  const isComment = line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('#');
                  return (
                    <div key={i}>
                      {isComment
                        ? <span style={{ color: '#2a5068' }}>{line}</span>
                        : <span style={{ color: '#7ecfef' }}>
                            {line.replace(/\b(struct|uint64_t|double|void|int|auto|bool|if|return|while|static_cast|const|true|false)\b/g, (m) => `⟨${m}⟩`).split('⟨').map((part, j) => {
                              if (j === 0) return <span key={j} style={{ color: '#7ecfef' }}>{part}</span>;
                              const [kw, rest] = part.split('⟩');
                              return <span key={j}><span style={{ color: '#00e5ff' }}>{kw}</span><span style={{ color: '#4a8fa8' }}>{rest}</span></span>;
                            })}
                          </span>
                      }
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>

          {/* Ruby */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '13px', color: '#ff3333' }}>RUBY SCRIPTS</div>
              <div style={{ flex: 1, height: '1px', background: '#0d2535' }} />
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#2a5068' }}>cyberpunk.rb</div>
            </div>
            <div className="panel p-4 overflow-x-auto" style={{ maxHeight: 380 }}>
              <pre style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', lineHeight: 1.6 }}>
                {RUBY_EXAMPLE.split('\n').map((line, i) => {
                  const isComment = line.trim().startsWith('#');
                  const isString = line.includes('"') || line.includes("'") || line.includes(':');
                  return (
                    <div key={i}>
                      {isComment
                        ? <span style={{ color: '#2a5068' }}>{line}</span>
                        : <span style={{ color: isString ? '#ff8800' : '#7ecfef' }}>{line}</span>
                      }
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '<5MB', label: 'Binary Size', color: '#00ff88' },
            { val: '<1%', label: 'CPU Overhead', color: '#00e5ff' },
            { val: '500ms', label: 'Refresh Rate', color: '#ff8800' },
            { val: 'C++17', label: 'Standard', color: '#7ecfef' },
          ].map(s => (
            <div key={s.label} className="panel p-4 text-center">
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.8rem', color: s.color, textShadow: `0 0 10px ${s.color}44` }}>
                {s.val}
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: '#2a5068', marginTop: '4px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
