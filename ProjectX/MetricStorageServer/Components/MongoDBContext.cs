using MongoDB.Driver;
namespace MetricStorageServer.Components
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDB"));
            _database = client.GetDatabase("metrics");
        }

        public IMongoCollection<T> GetCollection<T>(string name) => _database.GetCollection<T>(name);
    }
}
