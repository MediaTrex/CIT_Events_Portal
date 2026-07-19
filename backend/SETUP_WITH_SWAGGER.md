# Setup and Start Backend with Swagger UI

## Prerequisites
- Node.js (v18+)
- npm (v9+)
- Installed dependencies (`npm install`)

## Running Locally (Development)
```bash
npm run dev
```
The server will start on `http://localhost:3000`. Swagger UI is available at:
```
http://localhost:3000/api-docs
```

## Production Mode
```bash
npm run start:prod
```
Uses **PM2** with the `ecosystem.config.js` configuration.

## Docker
Build the image:
```bash
npm run docker:build
```
Run the container:
```bash
docker run -p 3000:3000 cit-events-backend
```

## Swagger Documentation
The OpenAPI spec lives in `backend/swagger.yaml`. Swagger UI is served via the `swagger-ui-express` middleware (configured in `src/app.js`). Access it at `/api-docs` when the server is running.

## Health Check
A health endpoint is exposed at:
```
GET /health
```
Returns `{ "status": "up" }`.

---
*This file provides a quick guide for developers to start the backend and explore the API via Swagger UI.*
