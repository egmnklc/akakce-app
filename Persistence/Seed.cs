using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Products.Any()) return;
            
            var products = new List<Product>
            {
                new Product
                {
                    Title = "Product 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Product description 1",
                    Category = "drinks",
                    Campaign = "London",
                },
                new Product
                {
                    Title = "Product 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Product description 2",
                    Category = "culture",
                    Campaign = "Louvre",
                },
                new Product
                {
                    Title = "Product 3",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Product description 3",
                    Category = "culture",
                    Campaign = "Natural History Museum",
                },
                new Product
                {
                    Title = "Product 4",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Product description 4",
                    Category = "music",
                    Campaign = "O2 Arena",
                },
                new Product
                {
                    Title = "Product 5",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Product description 5",
                    Category = "drinks",
                    Campaign = "Another pub",
                },
                new Product
                {
                    Title = "Product 6",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Product description 6",
                    Category = "drinks",
                    Campaign = "Yet another pub",
                },
                new Product
                {
                    Title = "Product 7",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Product description 7",
                    Category = "drinks",
                    Campaign = "Just another pub",
                },
                new Product
                {
                    Title = "Product 8",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Product description 8",
                    Category = "music",
                    Campaign = "Roundhouse Camden",
                },
                new Product
                {
                    Title = "Product 9",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Product description 9",
                    Category = "travel",
                    Campaign = "Somewhere on the Thames",
                },
                new Product
                {
                    Title = "Product 10",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Product description 10",
                    Category = "film",
                    Campaign = "Cinema",
                }
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}