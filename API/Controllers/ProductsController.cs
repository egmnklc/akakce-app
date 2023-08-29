using Application;
using Application.Products;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ProductsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Product = product }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(Guid id, Product product)
        {
            product.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Product = product }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}