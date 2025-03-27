using System;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController: ControllerBase
{
    private readonly StoreContext storeContext;
    public ProductsController(StoreContext sContext)
    {
        storeContext = sContext;
    }


    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts(){
        var products = await storeContext.Products.ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await storeContext.Products.FindAsync(id);
        if (product==null)
        {
            return NotFound();
        }
        return Ok(product);
    }

}

