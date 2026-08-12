import { useState, useEffect } from 'react';

function AnimatedBar({ value, color = '#00ff88', label }: { value: number; color?: string; label: string }) {
  const blocks = Math.floor(value / 5);
  const empty = 20 - blocks;
  const bar = '█'.repeat(blocks) + '░'.repeat(empty);
  const barColor = value > 80 ? '#ff3333' : value > 60 ? '#ff8800' : color;

  return (
    <div className="space-y-0.5">
      <div className="flex justify-between text-xs" style={{ color: '#2a5068', fontSize: '10px' }}>
        <span style={{ color: '#7ecfef' }}>{label}</span>
        <span style={{ color: barColor }}>{value}%</span>
      </div>
      <div className="text-xs" style={{ color: barColor, fontSize: '10px', letterSpacing: '-0.02em' }}>
        {bar}
      </div>
    </div>
  );
}

function MiniGraph({ data, color = '#00ff88' }: { data: number[]; color?: string }) {
  const max = Math.max(...data, 1);
  const h = 30;
  const w = 120;
  const step = w / (data.length - 1);

  const points = data.map((v, i) => `${i * step},${h - (v / max) * h}`).join(' ');

  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  );
}

function randomWalk(prev: number, min = 10, max = 95) {
  const delta = (Math.random() - 0.5) * 15;
  return Math.max(min, Math.min(max, prev + delta));
}

export default function SystemPanel() {
  const [time, setTime] = useState(new Date());
  const [cpu, setCpu] = useState(45);
  const [mem, setMem] = useState(39);
  const [cpuHistory, setCpuHistory] = useState<number[]>(Array(20).fill(45));
  const [memHistory, setMemHistory] = useState<number[]>(Array(20).fill(39));
  const [cores] = useState([
    { id: 0, val: 76 }, { id: 1, val: 38 }, { id: 2, val: 92 }, { id: 3, val: 51 },
  ]);
  const [coreVals, setCoreVals] = useState(cores.map(c => c.val));

  const uptime = { h: 3, m: 42, s: 17 };
  const [uptimeSecs, setUptimeSecs] = useState(uptime.h * 3600 + uptime.m * 60 + uptime.s);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setUptimeSecs(s => s + 1);

      const newCpu = Math.round(randomWalk(cpu));
      const newMem = Math.round(randomWalk(mem, 20, 70));
      setCpu(newCpu);
      setMem(newMem);
      setCpuHistory(prev => [...prev.slice(1), newCpu]);
      setMemHistory(prev => [...prev.slice(1), newMem]);
      setCoreVals(prev => prev.map(v => Math.round(randomWalk(v, 5, 99))));
    }, 1000);
    return () => clearInterval(interval);
  }, [cpu, mem]);

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const temp = 65 + Math.floor(cpu / 10);

  const processes = [
    { pid: 1337, name: 'edex-cli', cpu: 3.2, mem: 0.4 },
    { pid: 2819, name: 'firefox', cpu: 8.1, mem: 13.8 },
    { pid: 1024, name: 'postgres', cpu: 1.5, mem: 2.7 },
    { pid: 4096, name: 'nvim', cpu: 0.3, mem: 0.2 },
    { pid: 3200, name: 'node', cpu: 2.9, mem: 3.1 },
  ];

  return (
    <div className="panel h-full flex flex-col text-xs" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
      {/* Header */}
      <div className="border-b border-[#0d2535] px-3 py-1.5 flex items-center justify-between">
        <span style={{ color: '#2a5068', fontSize: '10px' }}>PANEL</span>
        <span style={{ color: '#2a5068', fontSize: '10px' }}>SYSTEM</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Clock */}
        <div>
          <div
            className="text-2xl font-bold tracking-widest"
            style={{ color: '#7ecfef', fontFamily: "'Orbitron', monospace", textShadow: '0 0 10px rgba(126,207,239,0.5)' }}
          >
            {time.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div style={{ color: '#2a5068', fontSize: '10px', marginTop: '2px' }}>
            {time.toLocaleDateString('pt-PT', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
          </div>
        </div>

        {/* System Info */}
        <div className="grid grid-cols-2 gap-1 text-xs" style={{ fontSize: '10px' }}>
          {[
            ['UPTIME', formatUptime(uptimeSecs)],
            ['TYPE', 'linux'],
            ['POWER', 'AC'],
            ['ARCH', 'x86_64'],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <span style={{ color: '#2a5068' }}>{k}</span>
              <span style={{ color: '#7ecfef' }}>{v}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-[#0d2535] pt-2 space-y-0.5" style={{ fontSize: '10px', color: '#2a5068' }}>
          <div><span style={{ color: '#4a8fa8' }}>MANUFACTURER</span> GIGABYTE</div>
          <div><span style={{ color: '#4a8fa8' }}>MODEL</span> B550M AORUS</div>
          <div><span style={{ color: '#4a8fa8' }}>CPU</span> Ryzen 9 5900X</div>
        </div>

        {/* CPU */}
        <div className="space-y-2">
          <div className="flex items-center justify-between" style={{ fontSize: '10px' }}>
            <span style={{ color: '#2a5068' }}>CPU USAGE</span>
            <span style={{ color: cpu > 80 ? '#ff3333' : '#00ff88' }}>{cpu}%</span>
          </div>
          <MiniGraph data={cpuHistory} color={cpu > 80 ? '#ff3333' : '#00ff88'} />
          <div style={{ fontSize: '10px', color: '#2a5068' }}>Avg {Math.round(cpuHistory.slice(-5).reduce((a, b) => a + b, 0) / 5)}%</div>

          <div className="space-y-1 mt-1">
            {coreVals.map((v, i) => (
              <AnimatedBar key={i} value={v} label={`Core ${i}`} color="#00ff88" />
            ))}
          </div>
        </div>

        {/* Temp */}
        <div className="flex items-center justify-between border-t border-[#0d2535] pt-2" style={{ fontSize: '10px' }}>
          <div>
            <div style={{ color: '#2a5068' }}>TEMP</div>
            <div style={{ color: temp > 80 ? '#ff3333' : '#ff8800' }}>{temp}°C</div>
          </div>
          <div>
            <div style={{ color: '#2a5068' }}>MIN/MAX</div>
            <div style={{ color: '#4a8fa8' }}>38/{temp + 5}°C</div>
          </div>
          <div>
            <div style={{ color: '#2a5068' }}>FREQ</div>
            <div style={{ color: '#4a8fa8' }}>3.7GHz</div>
          </div>
        </div>

        {/* Memory */}
        <div className="border-t border-[#0d2535] pt-2 space-y-2">
          <div className="flex items-center justify-between" style={{ fontSize: '10px' }}>
            <span style={{ color: '#2a5068' }}>MEMORY</span>
            <span style={{ color: '#7ecfef' }}>
              {Math.round(mem / 100 * 32768)}MB / 32768MB
            </span>
          </div>
          <MiniGraph data={memHistory} color="#00e5ff" />
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${mem}%`, background: 'linear-gradient(90deg, #00e5ff, #0066ff)' }} />
          </div>
          <div className="flex justify-between" style={{ fontSize: '10px', color: '#2a5068' }}>
            <span>SWAP</span>
            <span style={{ color: '#4a8fa8' }}>1.2 / 8.0 GB</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '15%', background: '#0066ff' }} />
          </div>
        </div>

        {/* Top Processes */}
        <div className="border-t border-[#0d2535] pt-2 space-y-1">
          <div style={{ color: '#2a5068', fontSize: '10px', marginBottom: '4px' }}>TOP PROCESSES</div>
          <div className="flex justify-between" style={{ fontSize: '9px', color: '#1a3545' }}>
            <span>PID</span><span>NAME</span><span>CPU</span><span>MEM</span>
          </div>
          {processes.map(p => (
            <div key={p.pid} className="flex justify-between" style={{ fontSize: '9px' }}>
              <span style={{ color: '#2a5068' }}>{p.pid}</span>
              <span style={{ color: '#4a8fa8' }}>{p.name}</span>
              <span style={{ color: p.cpu > 5 ? '#ff8800' : '#00ff88' }}>{p.cpu}%</span>
              <span style={{ color: '#4a8fa8' }}>{p.mem}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
