import { useEffect, useState } from 'react';
import { fetchAsteroids, fetchApod } from '../services/nasaApi';

interface Asteroid {
  id: string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: { meters: { estimated_diameter_min: number; estimated_diameter_max: number } };
  close_approach_data: {
    close_approach_date: string;
    miss_distance: { kilometers: string };
    relative_velocity: { kilometers_per_hour: string };
  }[];
}

interface Apod {
  title: string;
  explanation: string;
  url: string;
  date: string;
  media_type: string;
  copyright?: string;
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

export default function NasaSection() {
  const [date, setDate] = useState(todayISO());
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [apod, setApod] = useState<Apod | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadAsteroids(targetDate: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAsteroids(targetDate, targetDate);
      const list: Asteroid[] = Object.values(data.near_earth_objects ?? {}).flat() as Asteroid[];
      setAsteroids(list);
    } catch {
      setError('Falha ao buscar asteroides. Confira se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAsteroids(date);
    fetchApod()
      .then(setApod)
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    loadAsteroids(date);
  }

  return (
    <section className="relative py-16 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            style={{
              color: '#6d5a9e',
              fontSize: '11px',
              letterSpacing: '0.3em',
              fontFamily: "'Share Tech Mono', monospace",
              marginBottom: '8px',
            }}
          >
            // NASA DATA FEED
          </div>
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#c4b5fd',
              textShadow: '0 0 20px rgba(196,181,253,0.3)',
            }}
          >
            NASA FOR NERDS
          </h2>
          <p style={{ color: '#6d5a9e', fontFamily: "'Share Tech Mono', monospace", fontSize: '13px', marginTop: '8px' }}>
            Near-Earth Objects · Astronomy Picture of the Day
          </p>
        </div>

        {/* Date search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap items-center justify-center gap-3"
          style={{ marginBottom: '32px' }}
        >
          <label
            htmlFor="asteroid-date"
            style={{ color: '#9c8fc9', fontFamily: "'Share Tech Mono', monospace", fontSize: '12px' }}
          >
            data:
          </label>
          <input
            id="asteroid-date"
            name="asteroid-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              background: '#0f0a1f',
              border: '1px solid #2d1f52',
              color: '#c4b5fd',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '13px',
              padding: '8px 12px',
              borderRadius: '4px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              background: 'transparent',
              border: '1px solid #a855f7',
              color: '#a855f7',
              fontFamily: "'Orbitron', monospace",
              fontSize: '12px',
              padding: '8px 18px',
              borderRadius: '4px',
              cursor: 'pointer',
              textShadow: '0 0 8px rgba(168,85,247,0.4)',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(168,85,247,0.1)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(168,85,247,0.2)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            BUSCAR
          </button>
        </form>

        {loading && (
          <div style={{ textAlign: 'center', color: '#9c8fc9', fontFamily: "'Share Tech Mono', monospace", fontSize: '13px' }}>
            [ carregando dados da NASA... ]
          </div>
        )}

        {error && (
          <div
            style={{
              textAlign: 'center',
              color: '#ff4d6d',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '13px',
              textShadow: '0 0 8px rgba(255,77,109,0.3)',
            }}
          >
            [ ERROR ] {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Asteroids */}
            <div style={{ marginBottom: '48px' }}>
              <div
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: '14px',
                  color: '#a855f7',
                  marginBottom: '16px',
                  textShadow: '0 0 8px rgba(168,85,247,0.3)',
                }}
              >
                ▸ ASTEROIDES · {date}
              </div>

              {asteroids.length === 0 ? (
                <p style={{ color: '#4a3d6b', fontFamily: "'Share Tech Mono', monospace", fontSize: '12px' }}>
                  Nenhum asteroide registrado para essa data.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {asteroids.map((a) => {
                    const approach = a.close_approach_data[0];
                    const hazard = a.is_potentially_hazardous_asteroid;
                    const color = hazard ? '#ff4d6d' : '#3b82f6';
                    return (
                      <div
                        key={a.id}
                        className="panel p-4 transition-all"
                        style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = color + '44';
                          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${color}15`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = '#2d1f52';
                          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Orbitron', monospace",
                            fontSize: '12px',
                            color,
                            marginBottom: '8px',
                            textShadow: `0 0 8px ${color}44`,
                          }}
                        >
                          {a.name}
                        </div>
                        <p style={{ color: '#9c8fc9', fontSize: '11px', fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.6 }}>
                          diâmetro: ~{Math.round(a.estimated_diameter.meters.estimated_diameter_min)}–
                          {Math.round(a.estimated_diameter.meters.estimated_diameter_max)}m
                        </p>
                        {approach && (
                          <p style={{ color: '#9c8fc9', fontSize: '11px', fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.6 }}>
                            distância: {Math.round(Number(approach.miss_distance.kilometers)).toLocaleString()} km ·{' '}
                            {Math.round(Number(approach.relative_velocity.kilometers_per_hour)).toLocaleString()} km/h
                          </p>
                        )}
                        <p style={{ color: hazard ? '#ff4d6d' : '#4a3d6b', fontSize: '10px', fontFamily: "'Share Tech Mono', monospace", marginTop: '6px' }}>
                          {hazard ? '⚠ potencialmente perigoso' : 'sem risco identificado'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* APOD */}
            {apod && (
              <div>
                <div
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '14px',
                    color: '#3b82f6',
                    marginBottom: '16px',
                    textShadow: '0 0 8px rgba(59,130,246,0.3)',
                  }}
                >
                  ▸ ASTRONOMY PICTURE OF THE DAY
                </div>
                <div
                  className="panel overflow-hidden"
                  style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#a855f744';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 20px #a855f715';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#2d1f52';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  {apod.media_type === 'image' ? (
                    <img src={apod.url} alt={apod.title} style={{ width: '100%', display: 'block' }} />
                  ) : (
                    <div style={{ padding: '16px' }}>
                      <a href={apod.url} target="_blank" rel="noreferrer" style={{ color: '#a855f7' }}>
                        Ver mídia ({apod.media_type})
                      </a>
                    </div>
                  )}
                  <div style={{ padding: '12px 16px' }}>
                    <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '13px', color: '#c4b5fd', marginBottom: '6px' }}>
                      {apod.title}
                    </div>
                    <p style={{ color: '#9c8fc9', fontSize: '11px', fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.6, marginBottom: '8px' }}>
                      {apod.explanation}
                    </p>
                    <p style={{ color: '#4a3d6b', fontSize: '10px', fontFamily: "'Share Tech Mono', monospace" }}>
                      {apod.date} {apod.copyright ? `· © ${apod.copyright}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
