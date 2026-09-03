const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error(
    'VITE_API_URL não está definida. Configura-a em .env (produção) ou .env.development (local).'
  );
}

export async function fetchAsteroids(startDate: string, endDate: string) {
  const res = await fetch(`${API_BASE}/api/asteroids?start_date=${startDate}&end_date=${endDate}`);
  if (!res.ok) throw new Error('Falha ao buscar asteroides');
  return res.json();
}

export async function fetchApod(date?: string) {
  const query = date ? `?date=${date}` : '';
  const res = await fetch(`${API_BASE}/api/apod${query}`);
  if (!res.ok) throw new Error('Falha ao buscar imagem do dia');
  return res.json();
}
