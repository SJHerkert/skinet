using System;
using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    private readonly StoreContext storeContext;

    public BuggyController(StoreContext storeContext)
    {
        this.storeContext = storeContext;
    }

    [HttpGet("notfound")]
    public ActionResult GetNotFoundResult()
    {
        var thing = storeContext.Products.Find(42);

        if( thing == null)
        {
            return NotFound(new ApiResponse(404));
        }
        return Ok();
    }

    [HttpGet("servererror")]
    public ActionResult GetServerError()
    {
        var thing = storeContext.Products.Find(42);

        var thingToReturn = thing.ToString();

        return Ok();
    }

    [HttpGet("badrequest")]
    public ActionResult GetBadRequest()
    {
        return BadRequest(new ApiResponse(400));
    }

    //Validation type of error
    [HttpGet("badrequest/{id}")]
    public ActionResult GetNotFoundResult(int id)
    {
        return Ok();
    }

}
