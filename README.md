# 🛰️ NASA for Nerds

> Explore asteroides próximos da Terra e a Imagem Astronômica do Dia, direto dos dados públicos da NASA.

![status](https://img.shields.io/badge/status-em%20desenvolvimento-3d8bfd)
![license](https://img.shields.io/badge/license-MIT-0b3d91)
![stack](https://img.shields.io/badge/stack-React%20%2B%20Ruby-fc3d21)

---

## ✨ Sobre o projeto

**NASA for Nerds** é uma aplicação web que consome dados reais da [NASA Open APIs](https://api.nasa.gov/) para mostrar:

- 🌑 **Near-Earth Objects (NEO)** — asteroides que passam perto da Terra em uma data escolhida, com diâmetro estimado, distância de aproximação e se são potencialmente perigosos.
- 📸 **Astronomy Picture of the Day (APOD)** — a imagem (ou vídeo) astronômica do dia, com título e explicação.

O visual foi desenhado com um fundo de céu estrelado animado e uma paleta inspirada nas cores oficiais da NASA (azul, vermelho e branco).

---

## 🧱 Arquitetura

Nasa-for-Nerds/
├── nasa-nerds-frontend/ → React + Vite + TypeScript + Tailwind
└── nasa-nerds-backend/ → Ruby + Sinatra + Puma


O front-end **não fala diretamente com a API da NASA**. Toda requisição passa pelo backend em Ruby, que guarda a chave da NASA em variável de ambiente e nunca a expõe ao navegador.

┌───────────────┐ fetch ┌────────────────────┐ HTTParty ┌───────────────┐
│ Frontend │ ──────────────────► │ Backend (Ruby) │ ─────────────────────► │ NASA APIs │
│ React + Vite │ ◄────────────────── │ Sinatra + Puma │ ◄───────────────────── │ api.nasa.gov │
└───────────────┘ JSON └────────────────────┘ JSON └───────────────┘


---

## 🚀 Tecnologias

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS

**Backend**
- Ruby
- Sinatra
- Puma
- HTTParty
- Rack::Cors

## 🔌 Endpoints da API (backend)

| Método | Rota | Descrição | Parâmetros |
|---|---|---|---|
| `GET` | `/api/asteroids` | Lista asteroides próximos da Terra | `start_date`, `end_date` (formato `YYYY-MM-DD`) |
| `GET` | `/api/apod` | Imagem astronômica do dia | `date` *(opcional, formato `YYYY-MM-DD`)* |
- Dotenv

---
