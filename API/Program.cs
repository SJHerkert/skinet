using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using API.DI;
using API.Helpers;
using API.Middleware;
using API.Extensions;

public class Program
{
    //Add Async
    public static async Task Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();
        builder.Services.AddDbContext<StoreContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddApplicationServices();
        builder.Services.AddSwaggerDocumentation();

        // Add logging
        builder.Logging.ClearProviders();
        builder.Logging.AddConsole();

        //Trying to add Show Stack Trace == true, for my local developement 
//         builder.Services.AddProblemDetails(options =>
// {
//             options.CustomizeProblemDetails = context =>
//             {
//                 var hostEnv = context.HttpContext.RequestServices.GetRequiredService<IHostEnvironment>();
        
//                 var shouldIncludeStackTrace = hostEnv.IsDevelopment(); // Or customize to check for other environments
        
//                 if (context.Exception is null || !shouldIncludeStackTrace)
//                 {
//                     return;
//                 }
        
//                 context.ProblemDetails.Detail = context.Exception.StackTrace;
//             };
//         });

        // Build the application
        var app = builder.Build();

        // Apply migrations after app is built
        await ApplyMigrations.MigrateDatabaseAsync(app);

        // Configure the HTTP request pipeline.
        app.UseMiddleware<ExceptionMiddleware>();

        //This for the stack trace issue
        // app.UseExceptionHandler();

        app.UseStatusCodePagesWithReExecute("/errors/{0}");
        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseCors("CorsPolicy");
        app.UseAuthorization();
        app.UseSwaggerDocumentation();
        app.MapControllers();

        await app.RunAsync();

    }
}