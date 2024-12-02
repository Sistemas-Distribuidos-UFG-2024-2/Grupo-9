using MongoDB.Driver;
namespace MetricStorageServer.Components
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext()
        {
            const string connectionUri = "mongodb+srv://santoseduardo:lTHx2XrZCWSPqdYr@cluster1.gf7ol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
            var settings = MongoClientSettings.FromConnectionString(connectionUri);

            // Configurando a versão da API do servidor
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);

            // Criando o cliente e conectando ao banco
            var client = new MongoClient(settings);
            _database = client.GetDatabase("projectx");
            Console.WriteLine(_database);
        }

        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            return _database.GetCollection<T>(collectionName);
        }
    }
}
