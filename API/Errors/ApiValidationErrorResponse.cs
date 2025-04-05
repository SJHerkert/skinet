using System;


namespace API.Errors;

public class ApiValidationErrorResponse : ApiResponse
{
    public ApiValidationErrorResponse() : base(400)
    {
    }

    public IEnumerable<string> Errors { get; set; } = new List<string>();
    //Copilot: IEnumerable<string> Initialization: While not required, 
    // it's a good practice to initialize your Errors property 
    // to avoid potential null reference issues: = new List<string>();
}
