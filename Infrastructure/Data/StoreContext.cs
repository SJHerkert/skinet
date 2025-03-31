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
    }

}
