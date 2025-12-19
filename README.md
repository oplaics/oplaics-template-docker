# Oplaics Template (sencillo)

Repositorio plantilla con frontend (Vite + React) y backend (Laravel). Incluye configuración mínima para Docker (DB, nginx) y documentación breve en /docs.

## Tabla de contenido
- [Estructura](#estructura)
- [Requisitos](#requisitos)
- [Inicio rápido (Docker)](#inicio-r%C3%A1pido-docker)
- [Backend](#backend)
- [Frontend](#frontend)
- [Tests](#tests)
- [Notas y troubleshooting](#notas-y-troubleshooting)
- [Contribuir](#contribuir)

## Estructura
- frontend/ — aplicación React + Vite  
- backend/ — Laravel (Pest ya integrado para tests)  
- docker/ — volúmenes y configuración de servicios (db, nginx)  
- docs/ — documentación adicional  
  - commits.md — guía para mensajes de commit  
  - pr.md — guía para Pull Requests

## Requisitos
- Docker & Docker Compose (o Docker CLI con `docker compose`)  
- Node.js (para desarrollo frontend) 

## Inicio rápido (Docker)

1. Copiar archivos .env de ejemplo y ajustarlos si hace falta:
```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

2. Levantar los contenedores:
```bash
docker compose up -d
```

3. Instalar dependencias PHP dentro del contenedor PHP (necesario para que servicios como schedule funcionen):
```bash
# reemplaza "php" por el nombre del servicio PHP si es distinto
docker compose exec php bash
composer install
php artisan key:generate
```

4. Notas importante: nginx requiere certificados para funcionar correctamente. Estos se generan automáticamente al levantar el frontend (ver sección Frontend).

## Backend
- El backend corre sobre Laravel con nginx como proxy dentro del stack Docker.
- Tareas comunes:
```bash
# entrar al contenedor php
docker compose exec php bash

# instalar dependencias
composer install

# generar key de Laravel
php artisan key:generate

# correr migraciones
php artisan migrate
```

## Frontend
1. Entrar a la carpeta del frontend:
```bash
cd frontend
```
2. Instalar dependencias y arrancar modo desarrollo:
```bash
npm install
npm run dev
```
Al levantar el frontend se generan los certificados necesarios para nginx en el contenedor (siempre que la configuración de docker los incluya).

## Tests
- Backend: Pest está integrado. Para ejecutar tests dentro del contenedor:
```bash
docker compose exec php bash
php artisan test
```
- Frontend: usar el runner configurado en el proyecto (si aplica).

## Notas y troubleshooting
- El servicio `schedule` puede no funcionar hasta ejecutar `composer install` dentro del contenedor PHP.
- Si hay problemas de permisos con volúmenes, verificar usuarios/UID/GID usados por los contenedores. De momento todos los archivos son del Root, se está trabajando en resolver estos inconvenientes.
- Logs de servicios:
```bash
docker compose logs -f <servicio>
```

## Contribuir
- Revisa docs/commits.md y docs/pr.md para formato de commits y PRs.
- Abrir PRs pequeñas y descriptivas; incluir tests cuando sea posible.

## Licencia
Pos nosotros nos autorizamos a nosotros mismos de poder usar esta plantilla.