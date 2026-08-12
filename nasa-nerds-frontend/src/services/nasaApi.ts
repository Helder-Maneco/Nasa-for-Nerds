// Detecta se está no GitHub Pages (produção) ou no PC (desenvolvimento)
const API_BASE = import.meta.env.PROD 
  ? 'https://seu-app-no-render.onrender.com' // <-- Cole aqui a URL gerada pelo Render
  : 'http://localhost:4567';

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
