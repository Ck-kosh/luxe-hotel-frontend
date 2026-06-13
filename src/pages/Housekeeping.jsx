import { useState } from "react";

import {
  createRequest,
} from "../services/serviceApi";

function Housekeeping() {

  const [guestName, setGuestName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const requestData = {
      guest_name: guestName,
      service_type: "Housekeeping",
      description,
    };

    try {

      const result =
        await createRequest(
          requestData
        );

      alert(result.message);

      setGuestName("");
      setDescription("");

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
        Housekeeping
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

        <textarea
          placeholder=
            "Cleaning Instructions"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="
          border
          p-3
          rounded
          w-full"
        />

        <button
          type="submit"
          className="
          bg-teal-700
          text-white
          px-6
          py-3
          rounded"
        >
          Submit Request
        </button>

      </form>

    </div>
  );
}

export default Housekeeping;