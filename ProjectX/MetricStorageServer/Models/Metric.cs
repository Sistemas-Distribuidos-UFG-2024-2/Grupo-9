public class Metric
{
    public required string Ip { get; set; }
    public DateTime Timestamp { get; set; }
    public double UsoDeCpuPorcentagemCore0 { get; set; }
    public double UsoDeCpuPorcentagemCore1 { get; set; }
    public double UsoDeMemoriaPorcentagemTotal { get; set; }
    public double UsoDeMemoriaPorcentagemCache { get; set; }
    public double UsoDeMemoriaBytesTotal { get; set; }
    public double UsoDeArmazenamentoPorcentagemDiscoC { get; set; }
    public double UsoDeArmazenamentoPorcentagemDiscoD { get; set; }
    public double UsoDeArmazenamentoBytesDiscoC { get; set; }
}

