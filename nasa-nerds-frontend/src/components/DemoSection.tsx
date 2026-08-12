import SystemPanel from './SystemPanel';
import TerminalPanel from './TerminalPanel';
import NetworkPanel from './NetworkPanel';
import FilesystemPanel from './FilesystemPanel';
import KeyboardPanel from './KeyboardPanel';

export default function DemoSection() {
  return (
    <section id="demo" className="relative py-8 px-4" style={{ zIndex: 10 }}>
      <div className="max-w-full mx-auto">
        {/* Section header */}
        <div className="text-center mb-6">
          <div style={{ color: '#2a5068', fontSize: '11px', letterSpacing: '0.3em', fontFamily: "'Share Tech Mono', monospace", marginBottom: '6px' }}>
            // LIVE DEMO
          </div>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#7ecfef' }}>
            INTERACTIVE PREVIEW
          </h2>
          <p style={{ color: '#2a5068', fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', marginTop: '4px' }}>
            Simulated eDEX-CLI interface · Type commands in the terminal · Stats update in real-time
          </p>
        </div>

        {/* Top bar like eDEX */}
        <div
          className="flex items-center justify-between px-4 py-1.5 border-b border-[#0d2535]"
          style={{ background: '#060b0f', fontFamily: "'Share Tech Mono', monospace" }}
        >
          <div className="flex items-center gap-6">
            <span style={{ color: '#2a5068', fontSize: '10px' }}>PANEL</span>
            <span style={{ color: '#2a5068', fontSize: '10px' }}>SYSTEM</span>
          </div>
          <div className="flex items-center gap-8">
            <span style={{ color: '#7ecfef', fontSize: '10px', borderBottom: '1px solid #00e5ff', paddingBottom: '2px' }}>TERMINAL</span>
            <span style={{ color: '#2a5068', fontSize: '10px' }}>MAIN SHELL</span>
            <span style={{ color: '#2a5068', fontSize: '10px' }}>EMPTY</span>
            <span style={{ color: '#2a5068', fontSize: '10px' }}>EMPTY</span>
            <span style={{ color: '#2a5068', fontSize: '10px' }}>EMPTY</span>
            <span style={{ color: '#2a5068', fontSize: '10px' }}>EMPTY</span>
          </div>
          <div className="flex items-center gap-6">
            <span style={{ color: '#2a5068', fontSize: '10px' }}>MAIN SHELL</span>
            <span style={{ color: '#2a5068', fontSize: '10px' }}>PANEL</span>
            <span style={{ color: '#2a5068', fontSize: '10px' }}>NETWORK</span>
          </div>
        </div>

        {/* Main 3-column layout */}
        <div
          className="grid gap-0"
          style={{ gridTemplateColumns: 'clamp(180px, 18%, 220px) 1fr clamp(160px, 15%, 200px)', height: '520px', border: '1px solid #0d2535', borderTop: 'none' }}
        >
          {/* Left: System Panel */}
          <div style={{ borderRight: '1px solid #0d2535', overflow: 'hidden' }}>
            <SystemPanel />
          </div>

          {/* Center: Terminal */}
          <div style={{ overflow: 'hidden' }}>
            <TerminalPanel />
          </div>

          {/* Right: Network Panel */}
          <div style={{ borderLeft: '1px solid #0d2535', overflow: 'hidden' }}>
            <NetworkPanel />
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="grid gap-0"
          style={{ gridTemplateColumns: '1fr 1fr', border: '1px solid #0d2535', borderTop: 'none', height: '240px' }}
        >
          {/* Filesystem */}
          <div style={{ borderRight: '1px solid #0d2535', overflow: 'hidden' }}>
            <FilesystemPanel />
          </div>

          {/* Keyboard */}
          <div style={{ overflow: 'hidden' }}>
            <KeyboardPanel />
          </div>
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-1"
          style={{ background: '#060b0f', border: '1px solid #0d2535', borderTop: 'none', fontFamily: "'Share Tech Mono', monospace" }}
        >
          <span style={{ color: '#2a5068', fontSize: '9px' }}>
            eDEX-CLI v1.0.0 · Flix Branch · C++17 + Ruby
          </span>
          <div className="flex items-center gap-4">
            <span style={{ color: '#00ff88', fontSize: '9px' }}>● MONITOR ACTIVE</span>
            <span style={{ color: '#2a5068', fontSize: '9px' }}>Refresh: 500ms</span>
            <span style={{ color: '#2a5068', fontSize: '9px' }}>Theme: dark</span>
          </div>
          <span style={{ color: '#2a5068', fontSize: '9px' }}>
            [Q]uit [T]heme [H]elp [R]uby
          </span>
        </div>
      </div>
    </section>
  );
}
