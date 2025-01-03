﻿using Grpc.Core;
using MongoDB.Bson;
using MongoDB.Driver;
using static MetricStorageServer.MetricService;

namespace MetricStorageServer.Components
{
    public class MetricService : MetricServiceBase
    {
        private readonly MongoDbContext _context;

        public MetricService(MongoDbContext context)
        {
            _context = context;
        }

        // Método para salvar métricas
        public override async Task<SaveMetricResponse> SaveMetric(SaveMetricRequest request, ServerCallContext context)
        {
            var metric = new Metric
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Ip = request.Ip,
                Timestamp = DateTime.UtcNow.ToString(),
                UsoDeCpuPorcentagemCore0 = request.UsoDeCpuPorcentagemCore0,
                UsoDeCpuPorcentagemCore1 = request.UsoDeCpuPorcentagemCore1,
                UsoDeMemoriaPorcentagemTotal = request.UsoDeMemoriaPorcentagemTotal,
                UsoDeMemoriaPorcentagemCache = request.UsoDeMemoriaPorcentagemCache,
                UsoDeMemoriaBytesTotal = request.UsoDeMemoriaBytesTotal,
                UsoDeArmazenamentoPorcentagemDiscoC = request.UsoDeArmazenamentoPorcentagemDiscoC,
                UsoDeArmazenamentoPorcentagemDiscoD = request.UsoDeArmazenamentoPorcentagemDiscoD,
                UsoDeArmazenamentoBytesDiscoC = request.UsoDeArmazenamentoBytesDiscoC
            };

            // Inserindo as métricas no banco MongoDB
            await _context.GetCollection<Metric>("metrics").InsertOneAsync(metric);

            return new SaveMetricResponse { Success = true, Id = metric.Id.ToString() };
        }

        // Método para obter métricas
        public override async Task<GetMetricsResponse> GetMetrics(GetMetricsRequest request, ServerCallContext context)
        {
            var metrics = await _context.GetCollection<Metric>("metrics")
                .Find(_ => true)
                .ToListAsync();

            var response = new GetMetricsResponse();

            foreach (var metric in metrics)
            {
                if (!response.MetricsByIp.ContainsKey(metric.Ip))
                {
                    response.MetricsByIp.Add(metric.Ip, new MetricList());
                }

                response.MetricsByIp[metric.Ip].Metrics.Add(metric);
            }

            return response;
        }
    }
}
