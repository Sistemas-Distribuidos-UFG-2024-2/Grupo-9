import * as Joi from 'joi';

export const metricsConfigValidation = Joi.object({
  METRICS_HOST: Joi.string().default('localhost'),
  METRICS_PORT: Joi.number().port().default(9090),
  METRICS_POLL_INTERVAL: Joi.number().min(1000).max(300000).default(3000),
  METRICS_TIMEOUT: Joi.number().min(1000).max(10000).default(5000),
  METRICS_HISTORY_LIMIT: Joi.number().min(100).max(10000).default(1000),
});
