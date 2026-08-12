import { useState, useEffect, useRef } from 'react';

const BOOT_SEQUENCE = [
  { text: '$ edex-cli --init', delay: 200, color: '#00ff88' },
  { text: 'Loading kernel modules...', delay: 400 },
  { text: 'Mounting /proc filesystem...', delay: 300 },
  { text: 'Reading /sys/class/hwmon...', delay: 250 },
  { text: '[  OK  ] CPU monitor initialized', delay: 350, color: '#00ff88' },
  { text: '[  OK  ] Memory tracker ready', delay: 200, color: '#00ff88' },
  { text: '[  OK  ] Network interface bound', delay: 300, color: '#00ff88' },
  { text: '[  OK  ] Termbox renderer started', delay: 400, color: '#00ff88' },
  { text: 'Spawning Ruby scripting engine...', delay: 500 },
  { text: '[  OK  ] Ruby 3.2 runtime loaded', delay: 350, color: '#00ff88' },
  { text: 'Unix Domain Socket: /tmp/edex.sock', delay: 200 },
  { text: '', delay: 100 },
  { text: '╔══════════════════════════════════╗', delay: 50, color: '#00e5ff' },
  { text: '║   eDEX-CLI v1.0.0 - Flix Branch  ║', delay: 50, color: '#00e5ff' },
  { text: '║   C++17 + Ruby · No Electron     ║', delay: 50, color: '#00e5ff' },
  { text: '╚══════════════════════════════════╝', delay: 50, color: '#00e5ff' },
  { text: '', delay: 150 },
  { text: '$ neofetch --ascii', delay: 400, color: '#00ff88' },
];

const NEOFETCH_LINES = [
  { text: '       .\'´`.              squared@edex-home', color: '#7ecfef' },
  { text: '      /    \\             ─────────────────────', color: '#7ecfef' },
  { text: '    /\\ \\  / /\\           OS: Arch Linux x86_64', color: '#7ecfef' },
  { text: '   /  \\ \\/ /  \\          Kernel: 6.8.1-arch1-1', color: '#7ecfef' },
  { text: '  / /\\ \\  / /\\ \\         Uptime: 3h 42m', color: '#7ecfef' },
  { text: ' /_/  \\_\\/_/  \\_\\        Shell: bash 5.2.21', color: '#7ecfef' },
  { text: ' \\ \\  / /\\ \\  / /        WM: i3', color: '#7ecfef' },
  { text: '  \\ \\/ /  \\ \\/ /         Terminal: edex-cli', color: '#7ecfef' },
  { text: '   \\  /    \\  /          CPU: AMD Ryzen 9 5900X', color: '#7ecfef' },
  { text: '    \\/      \\/           GPU: NVIDIA RTX 3080', color: '#7ecfef' },
  { text: '                         Memory: 12847 / 32768MB', color: '#7ecfef' },
];

const AFTER_LINES = [
  { text: '', delay: 100 },
  { text: '$ edex-cli --monitor --refresh=500ms', delay: 600, color: '#00ff88' },
  { text: 'Entering real-time monitor mode...', delay: 400 },
  { text: 'Press [Q] to exit | [T] for themes | [H] for help', delay: 300, color: '#ff8800' },
];

export default function TerminalPanel() {
  const [lines, setLines] = useState<{ text: string; color?: string }[]>([]);
  const [phase, setPhase] = useState<'boot' | 'neofetch' | 'after' | 'done'>('boot');
  const [currentLine, setCurrentLine] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [commandOutput, setCommandOutput] = useState<{ text: string; color?: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const allSequences = [...BOOT_SEQUENCE];

  useEffect(() => {
    if (phase === 'boot') {
      if (currentLine < allSequences.length) {
        const entry = allSequences[currentLine];
        const timeout = setTimeout(() => {
          setLines(prev => [...prev, { text: entry.text, color: entry.color }]);
          setCurrentLine(c => c + 1);
        }, entry.delay);
        return () => clearTimeout(timeout);
      } else {
        setPhase('neofetch');
        setCurrentLine(0);
      }
    }
  }, [phase, currentLine]);

  useEffect(() => {
    if (phase === 'neofetch') {
      if (currentLine < NEOFETCH_LINES.length) {
        const entry = NEOFETCH_LINES[currentLine];
        const timeout = setTimeout(() => {
          setLines(prev => [...prev, entry]);
          setCurrentLine(c => c + 1);
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        setPhase('after');
        setCurrentLine(0);
      }
    }
  }, [phase, currentLine]);

  useEffect(() => {
    if (phase === 'after') {
      if (currentLine < AFTER_LINES.length) {
        const entry = AFTER_LINES[currentLine];
        const timeout = setTimeout(() => {
          setLines(prev => [...prev, { text: entry.text, color: entry.color }]);
          setCurrentLine(c => c + 1);
        }, entry.delay);
        return () => clearTimeout(timeout);
      } else {
        setPhase('done');
      }
    }
  }, [phase, currentLine]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, commandOutput]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const cmd = inputValue.trim();
    if (!cmd) return;

    const responses: Record<string, { text: string; color?: string }[]> = {
      help: [
        { text: 'edex-cli commands:', color: '#00e5ff' },
        { text: '  --monitor        Start real-time system monitor', color: '#7ecfef' },
        { text: '  --cpu            CPU usage breakdown', color: '#7ecfef' },
        { text: '  --mem            Memory statistics', color: '#7ecfef' },
        { text: '  --net            Network traffic monitor', color: '#7ecfef' },
        { text: '  --disk           Disk usage overview', color: '#7ecfef' },
        { text: '  --theme <name>   Switch theme (dark/light/cyberpunk)', color: '#7ecfef' },
        { text: '  --ruby <script>  Execute Ruby customization script', color: '#7ecfef' },
        { text: '  --version        Show version info', color: '#7ecfef' },
      ],
      version: [
        { text: 'edex-cli v1.0.0 (Flix Branch)', color: '#00ff88' },
        { text: 'Built with C++17 + Termbox2', color: '#7ecfef' },
        { text: 'Ruby scripting: 3.2.0', color: '#7ecfef' },
        { text: 'Platform: Linux x86_64', color: '#7ecfef' },
        { text: 'Commit: a3f9c2d | Branch: Flix/production', color: '#2a5068' },
      ],
      clear: [],
      cpu: [
        { text: 'CPU: AMD Ryzen 9 5900X @ 3.7GHz', color: '#00e5ff' },
        { text: 'Cores: 12 | Threads: 24', color: '#7ecfef' },
        { text: '████████████░░░░ Core 0:  76%', color: '#00ff88' },
        { text: '██████░░░░░░░░░░ Core 1:  38%', color: '#00ff88' },
        { text: '████████████████ Core 2:  98%', color: '#ff3333' },
        { text: '████████░░░░░░░░ Core 3:  51%', color: '#00ff88' },
        { text: 'Avg Load: 65% | Temp: 72°C', color: '#ff8800' },
      ],
      mem: [
        { text: 'Memory: 12847 / 32768 MB (39.2%)', color: '#00e5ff' },
        { text: '████████░░░░░░░░░░░░ RAM', color: '#00ff88' },
        { text: 'Swap:   1024 / 8192 MB (12.5%)', color: '#7ecfef' },
        { text: '██░░░░░░░░░░░░░░░░░░ SWAP', color: '#00e5ff' },
        { text: '', color: undefined },
        { text: 'Top processes by MEM:', color: '#2a5068' },
        { text: '  PID 1337  edex-cli   128MB', color: '#7ecfef' },
        { text: '  PID 2048  firefox   4512MB', color: '#7ecfef' },
        { text: '  PID  512  postgres   892MB', color: '#7ecfef' },
      ],
      net: [
        { text: 'Interface: eth0 | State: UP', color: '#00ff88' },
        { text: 'IP: 192.168.1.42 | IPv6: fe80::1', color: '#7ecfef' },
        { text: '↓ Download: 12.4 MB/s', color: '#00e5ff' },
        { text: '↑ Upload:    2.1 MB/s', color: '#ff8800' },
        { text: 'Ping: 14ms | DNS: 1.1.1.1', color: '#7ecfef' },
      ],
    };

    const newOutput: { text: string; color?: string }[] = [
      { text: `$ ${cmd}`, color: '#00ff88' },
    ];

    if (cmd === 'clear') {
      setLines([]);
      setCommandOutput([]);
      setInputValue('');
      return;
    }

    const found = Object.keys(responses).find(k => cmd.startsWith(k));
    if (found) {
      newOutput.push(...(responses[found] || []));
    } else {
      newOutput.push({ text: `bash: ${cmd}: command not found`, color: '#ff3333' });
      newOutput.push({ text: "Type 'help' for available commands", color: '#2a5068' });
    }

    setCommandOutput(prev => [...prev, ...newOutput]);
    setInputValue('');
  };

  return (
    <div className="panel rounded-sm h-full flex flex-col" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#0d2535]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" style={{ boxShadow: '0 0 4px #ff3333' }} />
        <div className="w-2.5 h-2.5 rounded-full bg-orange-400" style={{ boxShadow: '0 0 4px #ff8800' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 4px #00ff88' }} />
        <span className="ml-2 text-xs" style={{ color: '#2a5068' }}>MAIN SHELL — edex-cli@localhost</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88', animation: 'pulse 2s infinite' }} />
          <span className="text-xs" style={{ color: '#2a5068' }}>LIVE</span>
        </div>
      </div>

      {/* Output */}
      <div className="flex-1 overflow-y-auto p-3 space-y-0.5" style={{ minHeight: 0 }}>
        {lines.map((line, i) => (
          <div
            key={i}
            className="text-xs leading-5"
            style={{ color: line.color || '#4a8fa8', whiteSpace: 'pre' }}
          >
            {line.text}
          </div>
        ))}
        {commandOutput.map((line, i) => (
          <div
            key={`cmd-${i}`}
            className="text-xs leading-5"
            style={{ color: line.color || '#4a8fa8', whiteSpace: 'pre' }}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#0d2535] px-3 py-2 flex items-center gap-2">
        <span className="text-xs" style={{ color: '#00ff88' }}>$</span>
        <input
          className="flex-1 bg-transparent outline-none text-xs"
          style={{ color: '#00e5ff', caretColor: '#00ff88', fontFamily: "'Share Tech Mono', monospace" }}
          placeholder="type a command (help, cpu, mem, net, version, clear)..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleCommand}
        />
        <span
          className="text-xs cursor-blink"
          style={{ color: '#00ff88' }}
        >█</span>
      </div>
    </div>
  );
}
