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
    {  //TryCatch Try:If no error then return 200, if error catch and return 500 
    try
        {
            var thing = storeContext.Products.Find(42);
            // Deliberate error, ignore
            var thingToReturn = thing.ToString();
            return StatusCode(200, "This shouldn't be OK, as the error is done on purpose! Check your method!?");
        }
        catch 
        {
            //Return the error message from Errors/ApiResponse.cs        
            return StatusCode(500, new ApiResponse(500));
        }
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
