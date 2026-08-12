import { useState, useEffect } from 'react';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all"
      style={{
        background: scrolled ? 'rgba(6,11,15,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid #0d2535' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 flex items-center justify-center"
            style={{ border: '1px solid #00e5ff', boxShadow: '0 0 8px rgba(0,229,255,0.3)' }}
          >
            <span style={{ color: '#00e5ff', fontSize: '12px', fontFamily: "'Orbitron', monospace", fontWeight: 700 }}>Ξ</span>
          </div>
          <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '14px', color: '#7ecfef', letterSpacing: '0.1em' }}>
            eDEX-CLI
          </span>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#2a5068' }}>v1.0.0</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {[
            ['#demo', 'DEMO'],
            ['#features', 'FEATURES'],
            ['#install', 'INSTALL'],
            ['https://github.com/Helder-Maneco/EdexUI-version-Flix', 'GITHUB'],
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '11px',
                color: '#2a5068',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00e5ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#2a5068')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side: clock + status */}
        <div className="flex items-center gap-4">
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: '#2a5068' }}>
            {time.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 4px #00ff88' }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#00ff88' }}>ONLINE</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
