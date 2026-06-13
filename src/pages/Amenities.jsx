import { useState } from "react";

import {
  createRequest,
} from "../services/serviceApi";

function Amenities() {

  const [guestName, setGuestName] =
    useState("");

  const [amenity, setAmenity] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const requestData = {
      guest_name: guestName,
      service_type:
        "Amenity Booking",
      description:
        amenity,
    };

    try {

      const result =
        await createRequest(
          requestData
        );

      alert(result.message);

      setGuestName("");
      setAmenity("");

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <div className="p-6">

      <h1
        className="
        text-3xl
        font-bold
        mb-6"
      >
        Amenities Booking
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
        max-w-lg
        space-y-4"
      >

        <input
          type="text"
          placeholder="Guest Name"
          value={guestName}
          onChange={(e) =>
            setGuestName(
              e.target.value
            )
          }
          className="
          border
          p-3
          rounded
          w-full"
        />

        <select
          value={amenity}
          onChange={(e) =>
            setAmenity(
              e.target.value
            )
          }
          className="
          border
          p-3
          rounded
          w-full"
        >

          <option value="">
            Select Amenity
          </option>

          <option value="Spa">
            Spa
          </option>

          <option value="Gym">
            Gym
          </option>

          <option value="Swimming Pool">
            Swimming Pool
          </option>

          <option value="Conference Room">
            Conference Room
          </option>

        </select>

        <button
          type="submit"
          className="
          bg-teal-700
          text-white
          px-6
          py-3
          rounded"
        >
          Book Amenity
        </button>

      </form>

    </div>
  );
}

export default Amenities;