using System;
using API.Dtos;
using AutoMapper;
using Core.Entities;


namespace API.Helpers;

public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, string?>
//IValueResolver is from automapper, define 
{
    private readonly IConfiguration configuration;

    public ProductUrlResolver(IConfiguration configuration)
    {
        this.configuration = configuration;
    }

    public string? Resolve(Product source, ProductToReturnDto destination, string? destMember, ResolutionContext context)
    {
        if(!string.IsNullOrEmpty(source.PictureUrl))
        {
            return configuration["ApiUrl"] + source.PictureUrl;
        }

        return null;
        
    }
}
