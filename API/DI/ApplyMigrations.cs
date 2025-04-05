using System;
using System.Threading.Tasks;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace API.DI;

public class ApplyMigrations
{
    
    public static async Task MigrateDatabaseAsync(WebApplication app)
    {    
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        
        try
        {
            var context = services.GetRequiredService<StoreContext>();
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            
            await context.Database.MigrateAsync(); // Applies pending migrations
            await StoreContextSeed.SeedAsync(context, loggerFactory);
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "Migration failed in {Environment}. Exception: {ExceptionMessage}", app.Environment.EnvironmentName, ex.Message);
            Environment.Exit(1); // Exits the application if migrations fail critically
        }
    }
}
