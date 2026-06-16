import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import SearchBar from "../components/SearchBar";

const fallbackRooms = [
  {
    id: 1,
    name: "Luxe Deluxe Room",
    price: 12500,
    quantity: 5,
    vacantRooms: 5,
    bedrooms: 1,
    features: ["Free WiFi", "King Bed", "City View"],
    internet: true,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Luxe Executive Suite",
    price: 10000,
    quantity: 3,
    vacantRooms: 3,
    bedrooms: 2,
    features: ["Private Lounge", "Breakfast Included", "Spa Access"],
    internet: true,
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Luxe Garden Villa",
    price: 12000,
    quantity: 2,
    vacantRooms: 2,
    bedrooms: 3,
    features: ["Private Patio", "Garden View", "Breakfast Included"],
    internet: true,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Luxe Penthouse",
    price: 20000,
    quantity: 1,
    vacantRooms: 1,
    bedrooms: 3,
    features: ["Rooftop Terrace", "City Skyline", "Champagne Service"],
    internet: true,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Luxe happy room",
    price: 8000,
    quantity: 3,
    vacantRooms: 2,
    bedrooms: 1,
    features: ["Private Patio", "Garden View", "Breakfast Included"],
    internet: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOc4Un-9gRvVDhgKZXdOWNOsrhVgjkbYa1UQ&s",
  },
  {
    id: 5,
    name: "Luxe Penthouse",
    price: 12000,
    quantity: 1,
    vacantRooms: 1,
    bedrooms: 2,
    features: ["City Skyline", "Champagne Service"],
    internet: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRrAEyYE-YAG4NoQo88GTA7zLLtn-8d6s2ZQ&s",
  },
];

function Booking() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // FETCH PRODUCTS
  const fetchProducts = useCallback(async () => {

    try {
      const data = await API.get("/products");
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setProducts(fallbackRooms);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [fetchProducts]);

  // REFRESH WHEN PRODUCTS UPDATED ELSEWHERE (e.g., admin adds/deletes, another tab books, or another browser session)
  useEffect(() => {
    const handler = (e) => {
      const detail = e?.detail;

      // If admin provided the new room data, add it locally
      if (detail && !detail.action) {
        setProducts((prev) => {
          const exists = prev.find((p) => p.id === detail.id);
          if (exists) return prev;
          return [detail, ...prev];
        });
        return;
      }

      // If delete action provided, remove locally
      if (detail && detail.action === "delete") {
        setProducts((prev) => prev.filter((p) => p.id !== detail.id));
        return;
      }

      // Fallback: refetch from API
      fetchProducts();
    };

    const handleStorage = (event) => {
      if (event.key === "productsUpdatedAt") {
        fetchProducts();
      }
    };

    const intervalId = window.setInterval(() => {
      fetchProducts();
    }, 10000);

    window.addEventListener("productsUpdated", handler);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", fetchProducts);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("productsUpdated", handler);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", fetchProducts);
    };
  }, [fetchProducts]);

  // BOOK ROOM
  const addToCart = async (product) => {

    const availableRooms =
      product.vacantRooms ?? product.quantity ?? 0;
    const takenRooms =
      product.takenRooms ?? 0;

    if (availableRooms <= 0) {

      alert("Room unavailable");

      return;
    }

    // UPDATE CART
    setCart((prevCart) => {

      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {

        return prevCart.map((item) =>

          item.id === product.id

            ? {
                ...item,
                cartQuantity:
                  item.cartQuantity + 1
              }

            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          cartQuantity: 1
        }
      ];
    });

    // UPDATE UI
    setProducts((prevProducts) =>

      prevProducts.map((item) =>

        item.id === product.id

          ? {
              ...item,
              vacantRooms:
                (item.vacantRooms ?? item.quantity ?? 0) - 1,
              takenRooms:
                (item.takenRooms ?? 0) + 1
            }

          : item
      )
    );

    // UPDATE DATABASE
    try {

      await API.patch(
        `/products/${product.id}`,
        {
          vacantRooms:
            availableRooms - 1,
          takenRooms:
            takenRooms + 1
        }
      );

      localStorage.setItem("productsUpdatedAt", String(Date.now()));
      window.dispatchEvent(new CustomEvent("productsUpdated", { detail: { id: product.id } }));

    } catch (error) {

      console.log(error);
    }
  };

  // PROCEED TO PAYMENT
  const handleCheckout = () => {

    if (cart.length === 0) {
      alert("No rooms selected");
      return;
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.cartQuantity,
      0
    );

    localStorage.setItem("bookingCart", JSON.stringify(cart));
    localStorage.setItem("bookingTotal", JSON.stringify(total));

    navigate("/login");
  };

  // SEARCH
  const filteredProducts = products.filter(
    (product) =>

      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-[#f5f5f5]">

      {/* HERO SECTION */}
      <div className="relative h-[40vh] w-full">

        <img
          src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80"
          alt="Bedroom"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">

          <p className="text-white uppercase tracking-[5px] mb-4 text-sm">
            Luxury Accommodation
          </p>

          <h1 className="text-white text-5xl md:text-6xl font-light">
            Book Your Stay
          </h1>

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* SEARCH */}
        <div className="mb-10">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ROOMS */}
          <div className="lg:col-span-3">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}

            </div>

          </div>

          {/* BOOKING SUMMARY */}
          <Cart
            cart={cart}
            handleBuy={handleCheckout}
          />

        </div>

      </div>

    </div>
  );
}

export default Booking