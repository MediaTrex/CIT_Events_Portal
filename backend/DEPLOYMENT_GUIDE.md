# Deployment Guide for CIT Event Hub Backend

## Prerequisites
- **Node.js** >= 20 (the Docker image uses `node:20-alpine`).
- **Docker** (optional, for containerized deployment).
- **PM2** (global install for process management): `npm install -g pm2`.
- **MySQL** instance (local or remote). Ensure the database schema is applied (`schema.sql`).

## 1. Configure Environment Variables
Create a copy of the example file and fill in the appropriate values:
```bash
cp .env.example .env
```
Edit `.env`:
```
# Server
PORT=8080          # Production port (PM2 will use this)
NODE_ENV=production

# Database
DB_HOST=localhost  # or the hostname of your MySQL container
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=cit_event_hub
DB_CONNECTION_LIMIT=10
```

## 2. Local Production Run (PM2)
```bash
# Install production dependencies (if not already installed)
npm ci --only=production

# Start the app with PM2 clustering
npm run start:prod
```
PM2 will launch the server using `ecosystem.config.js`, enable clustering (one process per CPU core), and write logs to `./logs/pm2-out.log` and `./logs/pm2-error.log`.

### Useful PM2 commands
- `pm2 status` – view running processes.
- `pm2 logs cit-events-backend` – stream logs.
- `pm2 reload cit-events-backend` – zero‑downtime reload after code changes.
- `pm2 stop cit-events-backend && pm2 delete cit-events-backend` – stop and remove.

## 3. Docker Deployment
### Build the image
```bash
docker build -t cit-events-backend .
```
### Run the container (with a MySQL container for example)
```bash
# Start a MySQL container (if you don't have one already)
docker run -d \
  --name cit-mysql \
  -e MYSQL_ROOT_PASSWORD=example \
  -e MYSQL_DATABASE=cit_event_hub \
  -p 3306:3306 \
  mysql:8

# Run the backend container, linking it to the MySQL container
docker run -d \
  --name cit-backend \
  --env-file .env \
  -p 8080:8080 \
  --link cit-mysql:mysql \
  cit-events-backend
```
The container will start the server via `npm run start:prod` (PM2 inside the container) and listen on port 8080.

## 4. Health Check
The service exposes a lightweight health endpoint:
```
GET /health
Response: { "status": "OK", "db": "connected" }
```
You can test it locally:
```bash
curl http://localhost:8080/health
```
If the DB connection cannot be established at startup, the endpoint will still return `OK` but log a warning – useful for container orchestration platforms that rely on the health check.

## 5. Graceful Shutdown
The server listens for `SIGINT` and `SIGTERM`. When the process receives one of these signals (e.g., `docker stop` or `pm2 stop`), it:
1. Stops accepting new HTTP connections.
2. Closes the existing server.
3. Gracefully ends the MySQL connection pool.
4. Exits with status 0 (or 1 on error).

## 6. Logging
- **Console**: in development mode (`NODE_ENV=development`) logs are printed to stdout.
- **Production**: logs are written as JSON to `logs/app.log` (rotated automatically after ~5 MB, up to 3 files). PM2 also writes its own stdout/stderr logs.
- **Error handling**: all API errors are captured by `middleware/errorHandler.js` and logged via Winston.

## 7. Updating the Service
1. Pull latest code and run tests (`npm test`).
2. Rebuild Docker image (`docker build ...`) **or** reload PM2 (`pm2 reload cit-events-backend`).
3. Verify health endpoint and functionality.

---
**Note:** For any environment‑specific tweaks (different DB host, TLS, etc.), adjust the `.env` values accordingly and redeploy.
