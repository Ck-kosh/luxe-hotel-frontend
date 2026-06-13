import {
  useState
} from "react";

import API from "../services/api";

function AddProduct() {

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [image, setImage] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      await API.post("/products", {
        name,
        price: Number(price),
        quantity: Number(quantity),
        image,
      });

      alert(
        "Product Added!"
      );

      setName("");
      setPrice("");
      setQuantity("");
      setImage("");
    };

  return (

    <div className="p-8">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto"
      >

        <h1 className="text-3xl font-bold mb-6">
          Add Product
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;