using System;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ProductRepository : IProductRepository
{
    public ProductRepository(StoreContext context)
    {
        Context = context;
    }

    public StoreContext Context { get; }

    public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
    {
        return await Context.ProductBrands.ToListAsync();
    }

    public async Task<Product> GetProductByIdAsync(int id)
    {
        return await Context.Products
            .Include(p => p.ProductType)
            .Include(p => p.ProductBrand)
            .FirstOrDefaultAsync(p => p.Id == id );
    }

    public async Task<IReadOnlyList<Product>> GetProductsAsync()
    {
        return await Context.Products
            .Include(p => p.ProductType)
            .Include(p => p.ProductBrand)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
    {
        return await Context.ProductTypes.ToListAsync();
    }

}
