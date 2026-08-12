import { useState, useEffect } from 'react';

function NetworkGraph({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  const h = 40;
  const w = 160;
  const step = w / (data.length - 1);

  const linePoints = data.map((v, i) => `${i * step},${h - (v / max) * (h - 4)}`).join(' ');
  const areaPoints = `0,${h} ` + data.map((v, i) => `${i * step},${h - (v / max) * (h - 4)}`).join(' ') + ` ${w},${h}`;

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`netgrad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#netgrad-${color.replace('#','')})`} />
      <polyline points={linePoints} fill="none" stroke={color} strokeWidth="1.5"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
    </svg>
  );
}

function WorldGlobe() {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 100 }}>
      <svg viewBox="0 0 100 100" width="90" height="90" style={{ opacity: 0.7 }}>
        {/* Globe outline */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="#0d2535" strokeWidth="1" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#00e5ff" strokeWidth="0.5" opacity="0.3" />

        {/* Latitude lines */}
        {[20, 35, 50, 65, 80].map(y => {
          const ry = Math.abs(y - 50);
          const rx = Math.sqrt(40 * 40 - ry * ry);
          return <ellipse key={y} cx="50" cy={y} rx={rx} ry={rx * 0.3} fill="none" stroke="#0d2535" strokeWidth="0.5" />;
        })}

        {/* Longitude lines */}
        {[0, 30, 60, 90, 120, 150].map(deg => {
          const angle = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={50 + 40 * Math.cos(angle)}
              y1={50 - 40 * Math.sin(angle)}
              x2={50 - 40 * Math.cos(angle)}
              y2={50 + 40 * Math.sin(angle)}
              stroke="#0d2535"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Continents simplified */}
        {/* North America */}
        <path d="M25,25 L35,22 L40,28 L38,38 L30,42 L22,36 Z" fill="#0d2535" stroke="#1a3545" strokeWidth="0.5" />
        {/* Europe */}
        <path d="M48,20 L58,18 L62,26 L56,32 L48,28 Z" fill="#0d2535" stroke="#1a3545" strokeWidth="0.5" />
        {/* Africa */}
        <path d="M50,35 L60,33 L64,50 L58,65 L48,62 L44,48 Z" fill="#0d2535" stroke="#1a3545" strokeWidth="0.5" />
        {/* Asia */}
        <path d="M62,20 L80,18 L84,30 L78,40 L65,38 L60,28 Z" fill="#0d2535" stroke="#1a3545" strokeWidth="0.5" />

        {/* Ping dots */}
        <circle cx="30" cy="33" r="2" fill="#00ff88" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="55" cy="24" r="2" fill="#00e5ff" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="72" cy="28" r="2" fill="#ff8800" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Connection lines */}
        <line x1="30" y1="33" x2="55" y2="24" stroke="#00ff88" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
        <line x1="55" y1="24" x2="72" y2="28" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
      </svg>

      {/* Scan ring */}
      <div
        className="absolute rounded-full border"
        style={{
          width: 96, height: 96,
          borderColor: 'rgba(0,229,255,0.15)',
          animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite'
        }}
      />
    </div>
  );
}

function randomWalk(prev: number, min: number, max: number) {
  const delta = (Math.random() - 0.5) * max * 0.3;
  return Math.max(min, Math.min(max, prev + delta));
}

export default function NetworkPanel() {
  const [dlData, setDlData] = useState<number[]>(Array(20).fill(0).map(() => Math.random() * 50));
  const [ulData, setUlData] = useState<number[]>(Array(20).fill(0).map(() => Math.random() * 20));
  const [ping, setPing] = useState(14);
  const [dl, setDl] = useState(12.4);
  const [ul, setUl] = useState(2.1);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDl = Math.round(randomWalk(dl, 0.5, 80) * 10) / 10;
      const newUl = Math.round(randomWalk(ul, 0.1, 20) * 10) / 10;
      const newPing = Math.round(randomWalk(ping, 4, 120));
      setDl(newDl);
      setUl(newUl);
      setPing(newPing);
      setDlData(prev => [...prev.slice(1), newDl]);
      setUlData(prev => [...prev.slice(1), newUl]);
    }, 1200);
    return () => clearInterval(interval);
  }, [dl, ul, ping]);

  const peers = [
    { ip: '194.187.249.35', label: 'STATE', state: 'ONLINE', color: '#00ff88' },
    { ip: '8.8.8.8', label: 'DNS-1', state: 'ONLINE', color: '#00ff88' },
    { ip: '1.1.1.1', label: 'DNS-2', state: 'ONLINE', color: '#00ff88' },
    { ip: '10.0.0.1', label: 'GATEWAY', state: 'ONLINE', color: '#00e5ff' },
  ];

  return (
    <div className="panel h-full flex flex-col text-xs" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
      {/* Header */}
      <div className="border-b border-[#0d2535] px-3 py-1.5 flex items-center justify-between">
        <span style={{ color: '#2a5068', fontSize: '10px' }}>PANEL</span>
        <span style={{ color: '#2a5068', fontSize: '10px' }}>NETWORK</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Network Status */}
        <div>
          <div style={{ color: '#2a5068', fontSize: '10px', marginBottom: '6px' }}>NETWORK STATUS — Interface: eth0</div>
          <div className="space-y-1.5">
            {peers.map(p => (
              <div key={p.ip} className="flex items-center justify-between" style={{ fontSize: '10px' }}>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color, boxShadow: `0 0 4px ${p.color}` }} />
                  <span style={{ color: '#2a5068' }}>{p.label}</span>
                </div>
                <span style={{ color: '#4a8fa8' }}>{p.ip}</span>
                <span style={{ color: p.color }}>{p.state}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ping */}
        <div className="border-t border-[#0d2535] pt-2 flex items-center justify-between">
          <div>
            <div style={{ color: '#2a5068', fontSize: '10px' }}>PING</div>
            <div style={{ color: ping > 50 ? '#ff3333' : ping > 25 ? '#ff8800' : '#00ff88', fontSize: '18px', fontFamily: 'Orbitron' }}>
              {ping}<span style={{ fontSize: '10px', color: '#2a5068' }}>ms</span>
            </div>
          </div>
          <div>
            <div style={{ color: '#2a5068', fontSize: '10px' }}>IPv4</div>
            <div style={{ color: '#7ecfef', fontSize: '10px' }}>192.168.1.42</div>
          </div>
        </div>

        {/* World Map / Globe */}
        <div className="border-t border-[#0d2535] pt-2">
          <div className="flex justify-between items-center mb-1" style={{ fontSize: '10px' }}>
            <span style={{ color: '#2a5068' }}>WORLD VIEW</span>
            <span style={{ color: '#2a5068' }}>GLOBAL NETWORK MAP</span>
          </div>
          <WorldGlobe />
          <div className="text-center" style={{ fontSize: '9px', color: '#2a5068' }}>
            ENDPOINT LAT/LON: -25.87 / 32.44
          </div>
        </div>

        {/* Network Traffic */}
        <div className="border-t border-[#0d2535] pt-2 space-y-2">
          <div className="flex justify-between" style={{ fontSize: '10px' }}>
            <span style={{ color: '#2a5068' }}>NETWORK TRAFFIC</span>
            <span style={{ color: '#2a5068' }}>↓/↑ DOWN, MB/S</span>
          </div>
          <div className="flex justify-between" style={{ fontSize: '10px' }}>
            <span style={{ color: '#2a5068' }}>TOTAL</span>
          </div>

          {/* Download graph */}
          <div>
            <div className="flex justify-between mb-0.5" style={{ fontSize: '9px' }}>
              <span style={{ color: '#00ff88' }}>↓ DL</span>
              <span style={{ color: '#00ff88' }}>{dl} MB/s</span>
            </div>
            <NetworkGraph data={dlData} color="#00ff88" />
          </div>

          {/* Upload graph */}
          <div>
            <div className="flex justify-between mb-0.5" style={{ fontSize: '9px' }}>
              <span style={{ color: '#00e5ff' }}>↑ UL</span>
              <span style={{ color: '#00e5ff' }}>{ul} MB/s</span>
            </div>
            <NetworkGraph data={ulData} color="#00e5ff" />
          </div>
        </div>

        {/* Interface stats */}
        <div className="border-t border-[#0d2535] pt-2 space-y-1" style={{ fontSize: '10px' }}>
          <div style={{ color: '#2a5068', marginBottom: '4px' }}>INTERFACE STATS</div>
          {[
            ['RX Bytes', '4.2 GB'],
            ['TX Bytes', '812 MB'],
            ['RX Packets', '3,241,882'],
            ['TX Packets', '1,094,221'],
            ['Errors', '0'],
            ['Dropped', '0'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span style={{ color: '#2a5068' }}>{k}</span>
              <span style={{ color: '#4a8fa8' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
