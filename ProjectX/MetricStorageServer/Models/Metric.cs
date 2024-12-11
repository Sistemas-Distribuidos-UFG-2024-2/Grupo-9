using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Metric
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Ip { get; set; }
    public DateTime Timestamp { get; set; }
    public double UsoDeCpuPorcentagemCore0 { get; set; }
    public double UsoDeCpuPorcentagemCore1 { get; set; }
    public double UsoDeMemoriaPorcentagemTotal { get; set; }
    public double UsoDeMemoriaPorcentagemCache { get; set; }
    public long UsoDeMemoriaBytesTotal { get; set; }
    public double UsoDeArmazenamentoPorcentagemDiscoC { get; set; }
    public double UsoDeArmazenamentoPorcentagemDiscoD { get; set; }
    public long UsoDeArmazenamentoBytesDiscoC { get; set; }
}