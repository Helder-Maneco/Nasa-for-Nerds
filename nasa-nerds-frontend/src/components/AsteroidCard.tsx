import { cn } from '../utils/cn';

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

export default function AsteroidCard({ asteroid }: { asteroid: Asteroid }) {
  const hazard = asteroid.is_potentially_hazardous_asteroid;
  const approach = asteroid.close_approach_data[0];

  return (
    <div
      className={cn(
        'panel p-4 transition-all duration-300',
        hazard
          ? 'bg-red-950/40 border-red/70 shadow-[0_0_20px_rgba(252,61,33,0.25)] hover:border-red hover:shadow-[0_0_30px_rgba(252,61,33,0.5)]'
          : 'hover:border-border/30 hover:shadow-[0_0_20px_rgba(11,61,145,0.08)]'
      )}
    >
      <div
        className={cn(
          'font-orbitron text-xs mb-2 font-bold tracking-wide',
          hazard ? 'text-red-400 drop-shadow-[0_0_10px_rgba(252,61,33,0.6)]' : 'text-border drop-shadow-[0_0_8px_rgba(11,61,145,0.27)]'
        )}
      >
        {asteroid.name}
      </div>

      <p className={cn(
        "font-techmono text-[11px] leading-relaxed",
        hazard ? 'text-red-100' : 'text-dim'
      )}>
        diâmetro: ~{Math.round(asteroid.estimated_diameter.meters.estimated_diameter_min)}–
        {Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max)}m
      </p>

      {approach && (
        <p className={cn(
            "font-techmono text-[11px] leading-relaxed",
            hazard ? 'text-red-100' : 'text-dim'
          )}>
          distância: {Math.round(Number(approach.miss_distance.kilometers)).toLocaleString()} km ·{' '}
          {Math.round(Number(approach.relative_velocity.kilometers_per_hour)).toLocaleString()} km/h
        </p>
      )}

      <p className={cn('font-techmono text-[10px] mt-1.5 font-semibold', hazard ? 'text-red-400' : 'text-border/60')}>
        {hazard ? '⚠ potencialmente perigoso' : 'sem risco identificado'}
      </p>
    </div>
  );
}
