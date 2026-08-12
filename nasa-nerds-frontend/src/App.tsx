import StarField from './components/StarField';
import NasaSection from './components/NasaSection';

export default function App() {
  return (
    <div className="scanlines" style={{ background: '#05030f', minHeight: '100vh', position: 'relative' }}>
      {/* Starfield background */}
      <StarField />

      {/* Background gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(168,85,247,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.05) 0%, transparent 60%)',
          zIndex: 1,
        }}
      />

      {/* Simple header */}
      <header
        className="relative py-6 px-6 text-center"
        style={{ zIndex: 10 }}
      >
        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#c4b5fd',
            textShadow: '0 0 20px rgba(196,181,253,0.3)',
          }}
        >
          NASA FOR NERDS
        </div>
      </header>

      {/* Content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <NasaSection />
      </main>

      {/* Corner decoration */}
      <div
        className="fixed bottom-4 right-4 pointer-events-none"
        style={{ zIndex: 100, fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#4a3d6b' }}
      >
        <div>[ NASA for Nerds · Flix ]</div>
      </div>
    </div>
  );
}
