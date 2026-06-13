function Cart({
  cart,
  handleBuy
}) {
  

  // TOTAL
  const total = cart.reduce(
    (sum, item) =>
      sum + (item.price * item.cartQuantity),
    0
  );

  return (

    <div className="bg-white p-6 rounded-2xl shadow-xl sticky top-5">

      {/* TITLE */}
      <h2 className="text-3xl font-semibold mb-6">
        Booking Summary
      </h2>

      {/* EMPTY */}
      {cart.length === 0 ? (

        <p className="text-gray-500">
          No rooms selected
        </p>

      ) : (

        cart.map((item) => (

          <div
            key={item.id}
            className="border-b py-4"
          >

            <p className="font-semibold text-lg">
              {item.name}
            </p>

            {item.bedrooms && (
              <p className="text-gray-600">
                {item.bedrooms} Bedroom{item.bedrooms > 1 ? "s" : ""}
              </p>
            )}

            {item.internet !== undefined && (
              <p className="text-gray-600">
                {item.internet ? "Internet available" : "No internet"}
              </p>
            )}

            <p className="text-gray-600">
              Rooms Booked:
              {" "}
              {item.cartQuantity}
            </p>

            <p className="text-gray-600">
              Price Per Night:
              {" "}
              Ksh {item.price}
            </p>

            <p className="font-bold mt-2">

              Total:
              {" "}

              Ksh
              {" "}

              {item.price *
                item.cartQuantity}

            </p>

          </div>
        ))
      )}

      {/* TOTAL */}
      <div className="mt-6">

        <h3 className="text-2xl font-bold">

          Grand Total:
          {" "}
          Ksh {total}

        </h3>

      </div>

      {/* BUTTON */}
      <button
        onClick={handleBuy}
        className="mt-6 w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
      >
        Proceed to Payment
      </button>

    </div>
  );
}

export default Cart;