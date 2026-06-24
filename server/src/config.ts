/**
 * Server Configuration
 * Loads environment variables (dotenv) and validates them against the pure
 * schema in `config.schema.ts`.
 */

import { config } from 'dotenv';
import { configSchema } from './config.schema.js';

// Load environment variables
config();

// Parse and validate configuration
export const appConfig = configSchema.parse({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  upstashRedisUrl: process.env.UPSTASH_REDIS_REST_URL,
  upstashRedisToken: process.env.UPSTASH_REDIS_REST_TOKEN,
  databaseUrl: process.env.DATABASE_URL,
  geminiApiKey: process.env.GEMINI_API_KEY,
  allowedOrigins: process.env.ALLOWED_ORIGINS || 'http://localhost:5173',
  cacheTtl: process.env.CACHE_TTL ? parseInt(process.env.CACHE_TTL, 10) : 3600000,
  cacheMaxSize: process.env.CACHE_MAX_SIZE ? parseInt(process.env.CACHE_MAX_SIZE, 10) : 1000,
  // GitHub App (server-only). `undefined` when unset so optional() passes.
  githubAppId: process.env.GITHUB_APP_ID || undefined,
  githubAppPrivateKey: process.env.GITHUB_APP_PRIVATE_KEY || undefined,
  githubAppWebhookSecret: process.env.GITHUB_APP_WEBHOOK_SECRET || undefined,
  githubAppSlug: process.env.GITHUB_APP_SLUG || undefined,
  githubAppClientId: process.env.GITHUB_APP_CLIENT_ID || undefined,
});

export {
  configSchema,
  requireGitHubAppConfig,
  type AppConfig,
  type RequiredGitHubAppConfig,
} from './config.schema.js';
