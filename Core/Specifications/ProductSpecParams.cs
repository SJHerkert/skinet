using System;

namespace Core.Specifications;

public class ProductSpecParams
{
    public const int MaxPageSize = 50;
    public int PageIndex { get; set; } = 1;

    private int _pageSize = 6; //Private backing field

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }

    public int? BrandId { get; set; }
    public int? TypeId { get; set; }
    public string? Sort { get; set; }
    private string? _search;
    public string? Search
    {
        get => _search!;
        set => _search = value?.ToLower();
    }

}
