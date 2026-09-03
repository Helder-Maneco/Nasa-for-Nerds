import { useEffect, useState } from 'react';
import { fetchAsteroids, fetchApod } from '../services/nasaApi';
import AsteroidCard from './AsteroidCard';

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
    <section className="relative z-10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="font-techmono text-[11px] tracking-[0.3em] text-dim mb-2">
            // NASA DATA FEED
          </div>
          <h2 className="font-orbitron text-[clamp(1.5rem,4vw,2.5rem)] text-ink drop-shadow-[0_0_20px_rgba(220,230,255,0.3)]">
            NASA FOR NERDS
          </h2>
          <p className="font-techmono text-[13px] text-dim mt-2">
            Near-Earth Objects · Astronomy Picture of the Day
          </p>
        </div>

        {/* Date search */}
        <form onSubmit={handleSearch} className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <label htmlFor="asteroid-date" className="font-techmono text-xs text-ink/70">
            data:
          </label>
          <input
            id="asteroid-date"
            name="asteroid-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-panel border border-border text-ink font-techmono text-[13px] px-3 py-2 rounded outline-none"
          />
          <button
            type="submit"
            className="font-orbitron text-xs px-[18px] py-2 rounded border border-cyan text-cyan bg-transparent cursor-pointer drop-shadow-[0_0_8px_rgba(61,139,253,0.4)] transition-[background,box-shadow] duration-200 hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(61,139,253,0.2)]"
          >
            BUSCAR
          </button>
        </form>

        {loading && (
          <div className="text-center font-techmono text-[13px] text-ink/70">
            [ carregando dados da NASA... ]
          </div>
        )}

        {error && (
          <div className="text-center font-techmono text-[13px] text-red drop-shadow-[0_0_8px_rgba(255,77,109,0.3)]">
            [ ERROR ] {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Asteroids */}
            <div className="mb-12">
              <div className="font-orbitron text-sm text-cyan mb-4 drop-shadow-[0_0_8px_rgba(61,139,253,0.3)]">
                ▸ ASTEROIDES · {date} · {asteroids.length} encontrado{asteroids.length === 1 ? '' : 's'}
              </div>

              {asteroids.length === 0 ? (
                <p className="font-techmono text-xs text-border/60">
                  Nenhum asteroide registrado para essa data.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {asteroids.map((a) => (
                    <AsteroidCard key={a.id} asteroid={a} />
                  ))}
                </div>
              )}
            </div>

            {/* APOD */}
            {apod && (
              <div>
                <div className="font-orbitron text-sm text-border mb-4 drop-shadow-[0_0_8px_rgba(11,61,145,0.3)]">
                  ▸ ASTRONOMY PICTURE OF THE DAY
                </div>
                <div className="panel overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-cyan/30 hover:shadow-[0_0_20px_rgba(61,139,253,0.08)]">
                  {apod.media_type === 'image' ? (
                    <img src={apod.url} alt={apod.title} className="w-full block" />
                  ) : (
                    <div className="p-4">
                      <a href={apod.url} target="_blank" rel="noreferrer" className="text-cyan">
                        Ver mídia ({apod.media_type})
                      </a>
                    </div>
                  )}
                  <div className="px-4 py-3">
                    <div className="font-orbitron text-[13px] text-ink mb-1.5">{apod.title}</div>
                    <p className="font-techmono text-[11px] leading-relaxed text-dim mb-2">
                      {apod.explanation}
                    </p>
                    <p className="font-techmono text-[10px] text-border/60">
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
