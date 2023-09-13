using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>{
                    new AppUser{DisplayName="Apple Store", UserName="Apple", Email="appstore@test.com", IsAdmin=true},
                    new AppUser{DisplayName="Huawei Store", UserName="Huawei", Email="huawei@test.com", IsAdmin=true},
                    new AppUser{DisplayName="Samsung Store", UserName="Samsung", Email="samsung@test.com", IsAdmin=true},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Title = "HP Victus 16-S0023NT 7Z4N1EA Ryzen 5 7640HS 16 GB 512 GB SSD RTX4060",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Laptop / Notebook, Full HD, HP Victus, IPS, Bluetooth, Klavye Aydınlatması, İşlemci Hızı: 4.30 GHz, İşlemci Çekirdek Sayısı: 6",
                    Category = "laptop",
                    Campaign = "15% Student discount",
                    Owner = "System"
                },
                new Product
                {
                    Title = "Samsung Premium AR18TSHZHWK A++ 18000 BTU Inverter Duvar Tipi Klima",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "nverter, Nem Alma, Sessiz, Tipi: Duvar Tipi (Split), BTU Değeri: 18.000 BTU, Ses Seviyesi: 58 dB",
                    Category = "cooler",
                    Campaign = "Same day cargo",
                    Owner = "System"
                },
                new Product
                {
                    Title = "iPhone 13 128 GB",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Dahili Hafıza: 128 GB, RAM Kapasitesi: 4 GB, Ekran Boyutu: 6.1 inç, Ekran Çözünürlüğü: 1170x2532 px, Çıkış Yılı: 2021, Ekran Yenileme Hızı: 60 Hz",
                    Category = "phone",
                    Campaign = "10% off",
                    Owner = "System"
                },
                new Product
                {
                    Title = "Intel Arc A750 21P02J00BA 256 Bit GDDR6 8 GB Ekran Kartı",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "ARC A750, Bellek: 8 GB, INTEL, GDDR6, Bellek Arabirimi: 256 Bit, HDMI, Display Port, DirectX 12 Ultimate",
                    Category = "graphics card",
                    Campaign = "",
                    Owner = "System"
                },
                new Product
                {
                    Title = "Samsung CRG5 LC24RG50FZRXUF",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Ekran Boyutu: 24 inç, Full HD, Yenileme Hızı: 144 Hz, Çözünürlük: 1920x1080 px, Tepki Süresi: 4 ms, HDMI, DisplayPort",
                    Category = "monitor",
                    Campaign = "",
                    Owner = "System"
                },
                new Product
                {
                    Title = "Samsung CR50 LC27R500FHPXUF",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Ekran Boyutu: 27 inç, Full HD, Yenileme Hızı: 60 Hz, VA, Çözünürlük: 1920x1080 px, Tepki Süresi: 4 ms, HDMI",
                    Category = "monitor",
                    Campaign = "Free cargo, Fast cargo",
                    Owner = "System"
                },
                new Product
                {
                    Title = "TCL 55P635 4K Ultra HD 55' 140 Ekran Uydu Alıcılı Google Smart LED TV",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "4K, 55 inç / 140 cm, USB Port Sayısı: 2 , Bluetooth, Çıkış Yılı: 2022, Çözünürlük: 3840x2160 px, Uydu Alıcılı",
                    Category = "tv",
                    Campaign = "Buy 1 get 1",
                    Owner = "System"
                },
                new Product
                {
                    Title = "Casper Excalibur G870.1245-BFA0X-B i5-12450H 16 GB 1 TB SSD RTX4050",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Laptop / Notebook, Full HD, Casper Excalibur, IPS, İşlemci Hızı: 3.3 GHz, İşlemci Çekirdek Sayısı: 8, İşlemci Önbelleği: 12 MB",
                    Category = "laptop",
                    Campaign = "20% off at basket",
                    Owner = "System"
                },
                new Product
                {
                    Title = "AirPods Pro",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Aktif Gürültü Önleme, Müzik Dinleyebilme, Kulak İçi, TWS, AirPods, Bluetooth Versiyonu: 5, Konuşma Süresi: 3.5 saat, Müzik Dinleme Süresi: 4.5 saat",
                    Category = "bluetooth-headset",
                    Campaign = "Free cargo",
                    Owner = "System"
                },
                new Product
                {
                    Title = "Gigabyte G5 MF-E2EE333SD i5-12500H 8 GB 512 GB SSD RTX4050",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Laptop / Notebook, Full HD, Bluetooth, Klavye Aydınlatması, İşlemci Hızı: 3.3 GHz, İşlemci Çekirdek Sayısı: 12, İşlemci Önbelleği: 18 MB",
                    Category = "laptop",
                    Campaign = "10% off",
                    Owner = "System"
                }
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}