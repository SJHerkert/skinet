using System;

namespace API.Helpers;

public class Pagination<T> where T : class
{   
    public Pagination(int PageIndex, int pageSize, int totalCount, IReadOnlyList<T> data)
    {
        this.PageIndex = PageIndex;
        PageSize = pageSize;
        TotalCount = totalCount;
        Data = data;
    }

    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public IReadOnlyList<T>? Data { get; set; }

}
