import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

function Home() {
  const navigate = useNavigate();

  const featuredServices = [
    { title: "Room Service", route: "/room-service" },
    { title: "Housekeeping", route: "/housekeeping" },
    { title: "Amenities", route: "/amenities" },
    { title: "Request History", route: "/requests" },
  ];

  return (
    <div className="bg-white text-gray-900 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative h-screen w-full">

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuLIvvO2Djen7le8s0lnLFA7gElb3rgns6Hw&s"
          alt="Luxe Hotel"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-black from-black/70 via-black/30 to-black/70" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">

          <p className="text-yellow-300 uppercase tracking-[6px] text-sm mb-4">
            Welcome To
          </p>

          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Luxe Hotel
          </h1>

          <p className="text-gray-200 max-w-3xl text-lg md:text-xl leading-relaxed mb-8">
            Experience elegant comfort, premium amenities, and exceptional service at Kenya's most welcoming luxury hotel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/booking")}
              className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full uppercase tracking-[1px] shadow-lg hover:bg-yellow-300 transition"
            >
              Book Now
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="border border-white text-white px-8 py-3 rounded-full uppercase tracking-[1px] hover:bg-white hover:text-black transition"
            >
              Explore Services
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 text-left max-w-4xl w-full mx-auto text-white">
            <div className="bg-white/10 rounded-3xl p-5 shadow-lg backdrop-blur-sm">
              <p className="text-3xl font-semibold">120+</p>
              <p className="text-sm text-gray-200">Luxury Rooms</p>
            </div>
            <div className="bg-white/10 rounded-3xl p-5 shadow-lg backdrop-blur-sm">
              <p className="text-3xl font-semibold">24/7</p>
              <p className="text-sm text-gray-200">Service & Support</p>
            </div>
            <div className="bg-white/10 rounded-3xl p-5 shadow-lg backdrop-blur-sm">
              <p className="text-3xl font-semibold">5</p>
              <p className="text-sm text-gray-200">Dining Options</p>
            </div>
            <div className="bg-white/10 rounded-3xl p-5 shadow-lg backdrop-blur-sm">
              <p className="text-3xl font-semibold">100%</p>
              <p className="text-sm text-gray-200">Guest Satisfaction</p>
            </div>
          </div>
        </div>

      </section>

      {/* INTRO SECTION */}
      <section className="relative z-10 -mt-24 px-6">

        <div className="max-w-6xl mx-auto bg-white shadow-2xl grid md:grid-cols-2">

          <div className="p-10 md:p-16 flex flex-col justify-center">

            <p className="uppercase tracking-[4px] text-sm text-gray-700 mb-4">
              Luxury & Comfort
            </p>

            <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
              Everything You Need In One Place
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              Luxe Hotel combines modern elegance with exceptional hospitality.
              Whether you're traveling for business or relaxation, our rooms,
              dining, and personalized service ensure a memorable stay.
            </p>
{/* 
            <button
              onClick={() => navigate("/booking")}
              className="bg-black text-white px-8 py-4 uppercase tracking-wider hover:bg-gray-800 transition w-fit"
            >
              Explore Rooms
            </button> */}

          </div>

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEj4Dmsg-wdst9UmPPnQpL1bVqvmW_v3sqow&s"
            alt="Elegant Bedroom"
            className="h-full w-full object-cover"
          />

        </div>

      </section>

      {/* FEATURES */}
      <section className="py-28 px-6 bg-[#f8f8f8]">

        <div className="max-w-6xl mx-auto text-center">

          <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-3">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-light mb-16">
            Designed For Exceptional Experiences
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-10 shadow-sm hover:shadow-xl transition duration-300">

              <div className="text-4xl mb-6">🏨</div>

              <h3 className="text-2xl font-medium mb-4">
                Elegant Rooms
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Spacious modern rooms designed with comfort, luxury,
                and relaxation in mind.
              </p>

            </div>

            <div className="bg-white p-10 shadow-sm hover:shadow-xl transition duration-300">

              <div className="text-4xl mb-6">🍽️</div>

              <h3 className="text-2xl font-medium mb-4">
                Fine Dining
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Enjoy carefully prepared meals and exceptional service
                throughout your stay.
              </p>

            </div>

            <div className="bg-white p-10 shadow-sm hover:shadow-xl transition duration-300">

              <div className="text-4xl mb-6">✨</div>

              <h3 className="text-2xl font-medium mb-4">
                Premium Service
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Our dedicated staff ensures every guest receives
                personalized attention and care.
              </p>

            </div>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                route={service.route}
              />
            ))}
          </div>

        </div>

      </section>

      {/* IMAGE SECTION */}
      <section className="relative h-[70vh]">

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75g0Yt1CbfEUH55Op11rKrKSdmP07_s8JZA&s"
          alt="Cozy Bedroom"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

          <div className="text-center text-white px-6">

            <p className="uppercase tracking-[5px] mb-4">
              Experience Luxury
            </p>

            <h2 className="text-4xl md:text-6xl font-light mb-6">
              Your Perfect Stay Awaits
            </h2>

            <button
              onClick={() => navigate("/booking")}
              className="border border-white px-8 py-3 uppercase tracking-widest hover:bg-white hover:text-black transition"
            >
              Reserve Now
            </button>

          </div>

        </div>

      </section>

      {/* FOOTER CTA */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">

        <p className="uppercase tracking-[4px] text-sm mb-4 text-white">
          Book Your Stay
        </p>

        <h2 className="text-4xl md:text-5xl font-light mb-8">
          Ready To Experience Luxe Hotel?
        </h2>

        <button
          onClick={() => navigate("/booking")}
          className="bg-yellow text-black px-8 py-4 uppercase tracking-widest hover:bg-gray-200 transition"
        >
          Go To Booking
        </button>

      </section>
      

    </div>
  );
}

export default Home;