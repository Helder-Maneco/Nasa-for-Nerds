import { useState, useEffect } from 'react';

const ROWS = [
  [
    ['ESC', 1.2], ['~\n`', 1], ['!\n1', 1], ['@\n2', 1], ['#\n3', 1], ['$\n4', 1], ['%\n5', 1], ['^\n6', 1], ['&\n7', 1], ['*\n8', 1], ['(\n9', 1], [')\n0', 1], ['_\n-', 1], ['+\n=', 1], ['BACK', 1.8],
  ],
  [
    ['TAB', 1.5], ['Q', 1], ['W', 1], ['E', 1], ['R', 1], ['T', 1], ['Y', 1], ['U', 1], ['I', 1], ['O', 1], ['P', 1], ['{\n[', 1], ['}\n]', 1], ['|\n\\', 1.3], ['ENTER', 1.5],
  ],
  [
    ['CAPS', 1.7], ['A', 1], ['S', 1], ['D', 1], ['F', 1], ['G', 1], ['H', 1], ['J', 1], ['K', 1], ['L', 1], [':\n;', 1], ['"\n\'', 1], ['\\\n|', 1.3],
  ],
  [
    ['SHIFT', 2], ['<\n,', 1], ['Z', 1], ['X', 1], ['C', 1], ['V', 1], ['B', 1], ['N', 1], ['M', 1], ['>\n.', 1], ['?\n/', 1], ['SHIFT', 1.7], ['↑', 1],
  ],
  [
    ['CTRL', 1.4], ['FN', 1.2], ['SPACE', 5.5], ['ALT GR', 1.4], ['CTRL', 1.4], ['←', 1], ['↓', 1], ['→', 1],
  ],
];

type Key = [string, number];

function KeyCap({ label, width, active }: { label: string; width: number; active: boolean }) {
  const isSpecial = !label.match(/^[A-Z0-9]$/);
  const lines = label.split('\n');

  return (
    <div
      className="flex flex-col items-center justify-center border cursor-pointer select-none transition-all"
      style={{
        minWidth: `${width * 28}px`,
        width: `${width * 28}px`,
        height: 26,
        borderColor: active ? '#00ff88' : '#0d2535',
        background: active ? 'rgba(0,255,136,0.15)' : 'rgba(9,18,24,0.9)',
        boxShadow: active ? '0 0 8px rgba(0,255,136,0.5)' : 'none',
        flexShrink: 0,
        padding: '0 2px',
      }}
    >
      {lines.length > 1 ? (
        <div className="flex flex-col items-center" style={{ lineHeight: 1 }}>
          <span style={{ color: active ? '#00ff88' : '#2a5068', fontSize: '7px' }}>{lines[0]}</span>
          <span style={{ color: active ? '#00ff88' : '#4a8fa8', fontSize: '8px' }}>{lines[1]}</span>
        </div>
      ) : (
        <span style={{ color: active ? '#00ff88' : isSpecial ? '#2a5068' : '#7ecfef', fontSize: '9px', fontWeight: isSpecial ? 400 : 500 }}>
          {label}
        </span>
      )}
    </div>
  );
}

export default function KeyboardPanel() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setActiveKey(key);
      setPressedKeys(prev => new Set([...prev, key]));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setPressedKeys(prev => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
      setTimeout(() => setActiveKey(null), 150);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Random key highlight simulation
  useEffect(() => {
    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    const interval = setInterval(() => {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      setActiveKey(randomKey);
      setTimeout(() => setActiveKey(null), 200);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (label: string) => {
    const main = label.split('\n').pop() || label;
    return activeKey === main || pressedKeys.has(main) || pressedKeys.has(label);
  };

  return (
    <div
      className="panel flex flex-col"
      style={{ fontFamily: "'Share Tech Mono', monospace", background: '#060b0f' }}
    >
      {/* Header */}
      <div className="border-b border-[#0d2535] px-3 py-1 flex items-center justify-between">
        <span style={{ color: '#2a5068', fontSize: '10px' }}>KEYBOARD INPUT</span>
        <span style={{ color: '#1a3545', fontSize: '10px' }}>PHYSICAL LAYOUT — ANSI US</span>
      </div>

      {/* Keys */}
      <div className="p-2 space-y-1 overflow-x-auto">
        {ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-0.5" style={{ flexWrap: 'nowrap' }}>
            {(row as Key[]).map(([label, width], i) => (
              <KeyCap key={i} label={label} width={width} active={isActive(label)} />
            ))}
          </div>
        ))}

        {/* Space row indicator */}
        <div className="flex items-center gap-4 pt-1 px-1">
          <div style={{ color: '#1a3545', fontSize: '9px' }}>
            Press any key to highlight · Auto-demo active
          </div>
          {activeKey && (
            <div style={{ color: '#00ff88', fontSize: '10px' }}>
              KEY: <span style={{ textShadow: '0 0 8px #00ff88' }}>{activeKey}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
