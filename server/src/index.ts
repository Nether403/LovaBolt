/**
 * WebKnot Backend API Server
 * Provides caching and data persistence for the WebKnot application
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { appConfig } from './config.js';
import cacheRoutes from './routes/cache.js';
import healthRoutes from './routes/health.js';
import aiRoutes from './routes/ai/index.js';
import githubAppRoutes from './routes/githubApp.js';
import { createRateLimit } from './middleware/rateLimit.js';

// Initialize Express app
const app: Express = express();

// Middleware
app.use(
  cors({
    origin: appConfig.allowedOrigins,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: '10mb',
    // Capture the raw request bytes so the GitHub webhook route can verify the
    // X-Hub-Signature-256 HMAC against the exact payload (design §2.3).
    verify: (req: Request & { rawBody?: Buffer }, _res: Response, buf: Buffer) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
    );
  });

  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/cache', cacheRoutes);
// Per-user (JWT) / per-IP rate limiting guards every AI proxy route (Req 3.6.1–3.6.4).
// Mounting the limiter ahead of the router covers ALL `/api/ai/*` endpoints so
// IP-based limiting is never the sole mechanism (Req 3.6.4).
app.use('/api/ai', createRateLimit(), aiRoutes);
app.use('/api/github', githubAppRoutes);

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'WebKnot API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      cache: '/api/cache',
      ai: '/api/ai',
      github: '/api/github',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
  });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server] Unhandled error:', err);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: appConfig.nodeEnv === 'development' ? err.message : undefined,
  });
});

// Start server
const server = app.listen(appConfig.port, () => {
  console.log(`
╔════════════════════════════════════════╗
║       WebKnot API Server               ║
╠════════════════════════════════════════╣
║ Status:      Running                   ║
║ Port:        ${appConfig.port}                      ║
║ Environment: ${appConfig.nodeEnv.padEnd(11)}        ║
║ Redis:       Connected                 ║
╚════════════════════════════════════════╝

API Endpoints:
  - Health:  http://localhost:${appConfig.port}/api/health
  - Cache:   http://localhost:${appConfig.port}/api/cache
  - AI:      http://localhost:${appConfig.port}/api/ai
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('[Server] Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[Server] SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('[Server] Server closed');
    process.exit(0);
  });
});

export default app;
