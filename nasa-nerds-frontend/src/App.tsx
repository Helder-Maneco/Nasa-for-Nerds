import StarField from './components/StarField';
import NasaSection from './components/NasaSection';

export default function App() {
  return (
    <div className="scanlines" style={{ background: '#03060f', minHeight: '100vh', position: 'relative' }}>
      {/* Starfield background */}
      <StarField />

      {/* Background gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(61,139,253,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(11,61,145,0.05) 0%, transparent 60%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <main style={{ position: 'relative', zIndex: 10, paddingTop: '32px' }}>
        <NasaSection />
      </main>

      {/* Corner decoration */}
      <div
        className="fixed bottom-4 right-4 pointer-events-none"
        style={{ zIndex: 100, fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#24345c' }}
      >
        <div>[ NASA for Nerds · Flix ]</div>
      </div>
    </div>
  );
}
