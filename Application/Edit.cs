using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Product Product { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.Product.Id);

                _mapper.Map(request.Product, product);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}