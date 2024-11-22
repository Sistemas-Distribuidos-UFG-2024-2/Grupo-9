import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Configurações do Servidor Web
  PORT: Joi.number()
    .port() // Valida se é uma porta válida (1-65535)
    .default(3000)
    .description('Porta em que o servidor web irá rodar'),

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development')
    .description('Ambiente da aplicação'),

  // Configurações do Servidor de Métricas
  METRICS_HOST: Joi.string()
    .hostname() // Valida se é um hostname válido
    .default('localhost')
    .description('Host do servidor de métricas'),

  METRICS_PORT: Joi.number()
    .port()
    .default(9090)
    .description('Porta do servidor de métricas'),

  METRICS_POLL_INTERVAL: Joi.number()
    .min(1000) // Mínimo de 1 segundo
    .max(300000) // Máximo de 5 minutos
    .default(3000)
    .description('Intervalo de coleta de métricas em milissegundos'),

  // Configuração do Nome Server
  NOME_SERVER_URL: Joi.string()
    .uri() // Valida se é uma URI válida
    .required()
    .description('URL do servidor de nomes'),

  // Configurações de Log e Debug
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug', 'verbose')
    .default('info')
    .description('Nível de log da aplicação'),

  // Configurações de Retry e Timeout
  MAX_RETRIES: Joi.number()
    .min(0)
    .max(10)
    .default(3)
    .description('Número máximo de tentativas de reconexão'),

  TIMEOUT: Joi.number()
    .min(1000)
    .max(30000)
    .default(5000)
    .description('Timeout para requisições em milissegundos'),

  // Configurações de Cache
  CACHE_TTL: Joi.number()
    .min(0)
    .max(3600000) // 1 hora
    .default(60000) // 1 minuto
    .description('Tempo de vida do cache em milissegundos'),

  CACHE_MAX_ITEMS: Joi.number()
    .min(100)
    .max(10000)
    .default(1000)
    .description('Número máximo de itens no cache'),

  // Configurações de Segurança
  RATE_LIMIT_WINDOW: Joi.number()
    .min(1000)
    .max(3600000)
    .default(900000) // 15 minutos
    .description('Janela de tempo para rate limit em milissegundos'),

  RATE_LIMIT_MAX_REQUESTS: Joi.number()
    .min(1)
    .max(1000)
    .default(100)
    .description('Número máximo de requisições por janela de tempo'),

  // Configurações do Collector
  COLLECTOR_BATCH_SIZE: Joi.number()
    .min(1)
    .max(1000)
    .default(100)
    .description('Tamanho do lote de métricas para processamento'),

  COLLECTOR_FLUSH_INTERVAL: Joi.number()
    .min(1000)
    .max(60000)
    .default(5000)
    .description('Intervalo para flush do buffer de métricas'),

  // Configurações de Histórico
  METRICS_HISTORY_SIZE: Joi.number()
    .min(100)
    .max(10000)
    .default(1000)
    .description('Tamanho máximo do histórico de métricas'),

  METRICS_RETENTION_PERIOD: Joi.number()
    .min(3600)
    .max(86400)
    .default(7200) // 2 horas
    .description('Período de retenção das métricas em segundos'),
})
  .unknown(true) // Permite variáveis de ambiente não especificadas
  .required(); // Torna o objeto de configuração obrigatório
