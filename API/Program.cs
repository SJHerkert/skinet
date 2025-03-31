using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Core.Interfaces;
using API.DI;

public class Program
{
    //Add Async
    public static async Task Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container(dependency injection container(DI)).
        builder.Services.AddScoped<IProductRepository, ProductRepository>();
        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        builder.Services.AddDbContext<StoreContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Add logging
        builder.Logging.ClearProviders();
        builder.Logging.AddConsole();

        // Build the application
        var app = builder.Build();

        // Apply migrations after app is built
        await ApplyMigrations.MigrateDatabaseAsync(app);

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        await app.RunAsync();

    }
}