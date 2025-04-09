using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;



namespace Infrastructure.Data;

public class StoreContext : DbContext
{
    public StoreContext(DbContextOptions<StoreContext>options):base(options){}
    public DbSet<Product> Products {get;set;} = null!;
    public DbSet<ProductBrand> ProductBrands {get;set;} = null!;
    public DbSet<ProductType> ProductTypes {get;set;} = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder) //void = not returning any value from this particular method
    {
        //base calls on the class we are deriving from: the DbContext
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());


        //Converting SQLite data type to double, so that we don't get an error when we are requesting data 
        //from api queried and sorted by price and it is not a supported type.
        if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
        {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var properties = entityType.ClrType.GetProperties().Where(p=> p.PropertyType == typeof(decimal));

                foreach (var property in properties)
                {
                    modelBuilder.Entity(entityType.Name).Property(property.Name).HasConversion<double>();
                }
            }
        }
    }

}
