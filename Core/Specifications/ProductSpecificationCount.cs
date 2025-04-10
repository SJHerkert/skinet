using System;

namespace Core.Specifications;

public class ProductSpecificationCount
{
    private int? brandId;
    private int? typeId;

    public ProductSpecificationCount(int? brandId, int? typeId)
    {
        this.brandId = brandId;
        this.typeId = typeId;
    }
}
