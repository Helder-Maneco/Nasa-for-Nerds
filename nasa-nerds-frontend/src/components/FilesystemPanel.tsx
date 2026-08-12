import { useState } from 'react';

type FsEntry = { name: string; type: 'dir' | 'file'; size?: string; icon: string };

const ROOT_FS: FsEntry[] = [
  { name: 'bin', type: 'dir', icon: '📁' },
  { name: 'boot', type: 'dir', icon: '📁' },
  { name: 'dev', type: 'dir', icon: '📁' },
  { name: 'etc', type: 'dir', icon: '⚙️' },
  { name: 'home', type: 'dir', icon: '🏠' },
  { name: 'lib', type: 'dir', icon: '📦' },
  { name: 'opt', type: 'dir', icon: '📁' },
  { name: 'proc', type: 'dir', icon: '🔧' },
  { name: 'sys', type: 'dir', icon: '💻' },
  { name: 'tmp', type: 'dir', icon: '📁' },
  { name: 'usr', type: 'dir', icon: '📁' },
  { name: 'var', type: 'dir', icon: '📁' },
];

const HOME_FS: FsEntry[] = [
  { name: '.config', type: 'dir', icon: '⚙️' },
  { name: '.local', type: 'dir', icon: '📁' },
  { name: 'Documents', type: 'dir', icon: '📄' },
  { name: 'Downloads', type: 'dir', icon: '📥' },
  { name: 'edex-cli', type: 'dir', icon: '💻' },
  { name: '.bashrc', type: 'file', size: '3.1KB', icon: '📜' },
  { name: '.zshrc', type: 'file', size: '8.4KB', icon: '📜' },
  { name: 'edex.rb', type: 'file', size: '1.2KB', icon: '💎' },
  { name: 'theme.json', type: 'file', size: '892B', icon: '🎨' },
  { name: 'README.md', type: 'file', size: '4.5KB', icon: '📖' },
  { name: 'CMakeLists.txt', type: 'file', size: '2.1KB', icon: '🔨' },
  { name: 'Makefile', type: 'file', size: '1.8KB', icon: '🔨' },
];

const EDEX_FS: FsEntry[] = [
  { name: 'src', type: 'dir', icon: '📁' },
  { name: 'build', type: 'dir', icon: '📁' },
  { name: 'themes', type: 'dir', icon: '🎨' },
  { name: 'scripts', type: 'dir', icon: '💎' },
  { name: 'main.cpp', type: 'file', size: '12.4KB', icon: '⚡' },
  { name: 'monitor.cpp', type: 'file', size: '8.7KB', icon: '⚡' },
  { name: 'renderer.cpp', type: 'file', size: '15.2KB', icon: '⚡' },
  { name: 'ruby_bridge.cpp', type: 'file', size: '6.1KB', icon: '⚡' },
  { name: 'config.json', type: 'file', size: '2.3KB', icon: '🎨' },
  { name: 'edex-cli', type: 'file', size: '1.2MB', icon: '⚡' },
];

const FS_MAP: Record<string, FsEntry[]> = {
  '/': ROOT_FS,
  '/home': HOME_FS,
  '/home/edex-cli': EDEX_FS,
};

const PATH_LABELS: Record<string, string> = {
  '/': 'Root /',
  '/home': '~/home',
  '/home/edex-cli': '~/edex-cli',
};

function FsIcon({ entry }: { entry: FsEntry }) {
  return (
    <div
      className="flex flex-col items-center gap-1 cursor-pointer group"
      style={{ width: 64, minWidth: 64 }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center border transition-all"
        style={{
          borderColor: '#0d2535',
          background: 'rgba(9,18,24,0.8)',
          fontSize: entry.type === 'dir' ? '20px' : '16px',
        }}
      >
        {entry.type === 'dir' ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path d="M3 7C3 5.9 3.9 5 5 5H9.59L11.59 7H19C20.1 7 21 7.9 21 9V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7Z"
              fill="#0d3040" stroke="#00e5ff" strokeWidth="0.8" opacity="0.8" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
              fill="#0d2535" stroke="#2a5068" strokeWidth="0.8" />
            <path d="M14 2V8H20" stroke="#2a5068" strokeWidth="0.8" />
          </svg>
        )}
      </div>
      <span
        className="text-center leading-tight"
        style={{ color: '#4a8fa8', fontSize: '9px', maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {entry.name}
      </span>
      {entry.size && (
        <span style={{ color: '#1a3545', fontSize: '8px' }}>{entry.size}</span>
      )}
    </div>
  );
}

export default function FilesystemPanel() {
  const [currentPath, setCurrentPath] = useState<string>('/home/edex-cli');
  const [selected, setSelected] = useState<string | null>(null);

  const entries = FS_MAP[currentPath] || HOME_FS;

  const goUp = () => {
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    const newPath = '/' + parts.join('/');
    if (FS_MAP[newPath] || newPath === '/') {
      setCurrentPath(newPath === '' ? '/' : newPath);
    }
  };

  const openDir = (entry: FsEntry) => {
    if (entry.type === 'dir') {
      const newPath = currentPath === '/' ? `/${entry.name}` : `${currentPath}/${entry.name}`;
      if (FS_MAP[newPath]) setCurrentPath(newPath);
    }
  };

  const diskUsage = [
    { name: '/dev/sda1', mount: '/', used: 71, total: '512GB', color: '#ff8800' },
    { name: '/dev/sdb1', mount: '/home', used: 45, total: '2TB', color: '#00ff88' },
    { name: 'tmpfs', mount: '/tmp', used: 12, total: '16GB', color: '#00e5ff' },
  ];

  return (
    <div className="panel h-full flex flex-col text-xs" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
      {/* Header */}
      <div className="border-b border-[#0d2535] px-3 py-1.5 flex items-center justify-between">
        <span style={{ color: '#2a5068', fontSize: '10px' }}>FILESYSTEM</span>
        <span style={{ color: '#4a8fa8', fontSize: '10px' }}>{currentPath}</span>
      </div>

      {/* Toolbar */}
      <div className="border-b border-[#0d2535] px-2 py-1 flex items-center gap-2">
        <button
          onClick={goUp}
          className="flex items-center gap-1 px-2 py-0.5 transition-all"
          style={{ color: '#2a5068', fontSize: '10px', border: '1px solid #0d2535', background: 'transparent' }}
        >
          ↑ up
        </button>
        <div className="flex-1 px-2" style={{ color: '#4a8fa8', fontSize: '10px', border: '1px solid #0d2535', padding: '2px 8px' }}>
          {PATH_LABELS[currentPath] || currentPath}
        </div>
      </div>

      {/* Files grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-wrap gap-2">
          {entries.map((entry) => (
            <div
              key={entry.name}
              onClick={() => { setSelected(entry.name); openDir(entry); }}
              style={{
                outline: selected === entry.name ? '1px solid #00e5ff' : 'none',
                outlineOffset: '2px',
              }}
            >
              <FsIcon entry={entry} />
            </div>
          ))}
        </div>

        {/* Disk usage */}
        <div className="mt-4 space-y-2 border-t border-[#0d2535] pt-3">
          <div style={{ color: '#2a5068', fontSize: '10px', marginBottom: '8px' }}>DISK USAGE</div>
          {diskUsage.map(d => (
            <div key={d.name} className="space-y-1">
              <div className="flex justify-between" style={{ fontSize: '9px' }}>
                <span style={{ color: '#4a8fa8' }}>{d.mount}</span>
                <span style={{ color: '#2a5068' }}>{d.name}</span>
                <span style={{ color: d.color }}>{d.used}% of {d.total}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${d.used}%`, background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Mount info */}
        <div className="mt-2 pt-2" style={{ fontSize: '10px', color: '#2a5068' }}>
          Mount <span style={{ color: '#4a8fa8' }}>/home/squared</span> used{' '}
          <span style={{ color: '#ff8800' }}>71%</span>
        </div>
      </div>
    </div>
  );
}
