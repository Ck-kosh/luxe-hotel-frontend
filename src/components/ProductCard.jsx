function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      <div className="relative">

        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover"
        />

        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          Ksh {product.price} / night
        </div>

      </div>

      <div className="p-5">

        <h3 className="text-2xl font-semibold mb-2">
          {product.name}
        </h3>

        {product.bedrooms && (
          <p className="text-gray-600 mb-2">
            {product.bedrooms} Bedroom{product.bedrooms > 1 ? "s" : ""}
          </p>
        )}

        {product.features?.length > 0 && (
          <p className="text-gray-600 mb-2">
            Features: {product.features.join(", ")}
          </p>
        )}

        {product.internet !== undefined && (
          <p className="text-gray-600 mb-2">
            {product.internet ? "Internet available" : "No internet"}
          </p>
        )}

        <p className="text-gray-600 mb-2">
          Available Rooms: {product.vacantRooms ?? product.quantity}
        </p>

        <button
          onClick={() => addToCart(product)}
          disabled={(product.vacantRooms ?? product.quantity) <= 0}
          className={`w-full py-3 rounded-xl text-white font-medium transition ${
            (product.vacantRooms ?? product.quantity) > 0
              ? "bg-black hover:bg-gray-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {(product.vacantRooms ?? product.quantity) > 0
            ? "Book Room"
            : "Fully Booked"}
        </button>

      </div>
    </div>
  );
}

export default ProductCard;