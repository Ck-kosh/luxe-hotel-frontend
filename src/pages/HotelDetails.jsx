import React from 'react';

const HotelDetails = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Luxe Hotel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
            alt="Luxury Bedroom"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            Luxe Hotel offers luxurious accommodations in the heart of the city. 
            With modern amenities and exceptional service, we ensure a memorable stay for all our guests.
          </p>
          <h3 className="text-xl font-bold mb-2">Amenities</h3>
          <ul className="list-disc list-inside text-blue-700">
            <li>Free Wi-Fi</li>
            <li>Swimming Pool</li>
            <li>Fitness Center</li>
            <li>Restaurant & Bar</li>
            <li>24/7 Concierge</li>
            <li>Room Service</li>
          </ul>
        </div>
      </div>
     <div className="tutorial-video">
  
  <div>
    <h2 className="text-2xl font-bold mt-8 mb-4">Dining/Services</h2>
    <p>

      <ul>
      <li>Food, restaurant, and other guest services are available at Luxe Hotel for your comfort and convenience.</li>
      <li>Enjoy delicious meals, restaurant services, and more during your stay at Luxe Hotel.</li>
      <li>Luxe Hotel offers food, restaurant, and additional hospitality services to all guests.</li>
      <li>Experience quality dining and excellent guest services at Luxe Hotel</li>
    </ul>

    </p>

  </div>
</div>
      <div className="mt-8">
        
        <h2 className="text-2xl font-bold mb-4">Location</h2>
        <p className="text-gray-700 mb-4">
          Located at  Nairobi, Kenya. 
        </p>
      
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          
          <p className="text-gray-500">Location Map</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-yellow-500">
            View on Google Maps
          </a>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Book Your Stay</h2>
        <p className="text-gray-700 mb-4">
          Ready to experience the best? Book your room now and enjoy a comfortable stay at Luxe Hotel.
        </p>
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Book Now
        </button> */}
      </div>
    </div>
  );
};

export default HotelDetails;