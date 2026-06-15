import React, { useEffect, useState } from 'react';

function RoomListing() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/rooms/'  );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Available Rooms</h2>
      {rooms.map(room => (
        <div key={room.id}>
          <h3>{room.name}</h3>
          <p>Price: Ksh {room.price}</p>
          {/* Add button to add to cart, etc. */}
        </div>
      ))}
    </div>
  );
}

export default RoomListing;