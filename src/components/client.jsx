// "use client";

// import { motion } from "framer-motion";
// import {
//   CalendarDays,
//   MapPin,
//   Star,
//   Wifi,
//   Trees,
//   Coffee,
// } from "lucide-react";

// const rooms = [
//   {
//     name: "Deluxe Forest Room",
//     image:
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945",
//     price: "KES 12,500",
//     features: ["Free WiFi", "Breakfast Included", "Garden View"],
//   },
//   {
//     name: "Executive Suite",
//     image:
//       "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
//     price: "KES 22,000",
//     features: ["Private Lounge", "King Bed", "Nature Balcony"],
//   },
//   {
//     name: "Conference Cottage",
//     image:
//       "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
//     price: "KES 35,000",
//     features: ["Group Stay", "Fireplace", "Tea Field View"],
//   },
// ];

// export default function BrackenhurstLanding() {
//   return (
//     <div className="bg-[#f7f5ef] min-h-screen text-gray-800">
      
//       {/* HERO */}
//       <section
//         className="relative h-screen bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/50" />

//         <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
//           <motion.h1
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-5xl md:text-7xl font-bold text-white mb-6"
//           >
//             Escape to Brackenhurst
//           </motion.h1>

//           <p className="text-white text-lg md:text-2xl max-w-2xl mb-8">
//             Experience serenity, nature, conferences, and luxury retreats
//             just outside Nairobi.
//           </p>

//           <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full text-lg shadow-lg transition">
//             Book Your Stay
//           </button>
//         </div>
//       </section>

//       {/* BOOKING BAR */}
//       <section className="-mt-16 relative z-20 px-6">
//         <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6 grid md:grid-cols-4 gap-4">
//           <input
//             type="date"
//             className="border rounded-xl p-4"
//           />
//           <input
//             type="date"
//             className="border rounded-xl p-4"
//           />

//           <select className="border rounded-xl p-4">
//             <option>Guests</option>
//             <option>1 Guest</option>
//             <option>2 Guests</option>
//             <option>Family</option>
//           </select>

//           <button className="bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800">
//             Check Availability
//           </button>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="py-20 px-6">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
//           {[
//             {
//               icon: <Trees size={40} />,
//               title: "Nature Retreat",
//             },
//             {
//               icon: <Wifi size={40} />,
//               title: "Fast WiFi",
//             },
//             {
//               icon: <Coffee size={40} />,
//               title: "Organic Dining",
//             },
//             {
//               icon: <MapPin size={40} />,
//               title: "Near Nairobi",
//             },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl p-8 shadow-lg text-center"
//             >
//               <div className="text-green-700 flex justify-center mb-4">
//                 {item.icon}
//               </div>

//               <h3 className="text-xl font-semibold">
//                 {item.title}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ROOMS */}
//       <section className="py-16 px-6 bg-[#ece8dc]">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold mb-12 text-center">
//             Featured Rooms
//           </h2>

//           <div className="grid md:grid-cols-3 gap-10">
//             {rooms.map((room, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ y: -10 }}
//                 className="bg-white rounded-3xl overflow-hidden shadow-xl"
//               >
//                 <img
//                   src={room.image}
//                   alt={room.name}
//                   className="h-64 w-full object-cover"
//                 />

//                 <div className="p-6">
//                   <h3 className="text-2xl font-bold mb-3">
//                     {room.name}
//                   </h3>

//                   <p className="text-green-700 font-semibold mb-4">
//                     {room.price} / night
//                   </p>

//                   <ul className="space-y-2 mb-6">
//                     {room.features.map((feature, i) => (
//                       <li key={i} className="flex items-center gap-2">
//                         <Star size={16} />
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>

//                   <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl">
//                     Reserve Now
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIAL */}
//       <section className="py-20 px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-8">
//             What Guests Say
//           </h2>

//           <p className="text-xl italic text-gray-600">
//             “A peaceful escape surrounded by tea fields and forests.
//             Perfect for conferences and relaxation.”
//           </p>

//           <div className="mt-6 text-green-700 font-semibold">
//             ★★★★★ Guest Review
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-[#1d2b1f] text-white py-10 px-6">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-2xl font-bold mb-4">
//               Brackenhurst
//             </h3>

//             <p>
//               Eco-conscious retreat and conference destination in
//               Iten, Kenya.
//             </p>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-3">Quick Links</h4>

//             <ul className="space-y-2">
//               <li>Rooms</li>
//               <li>Dining</li>
//               <li>Conference Spaces</li>
//               <li>Gallery</li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-3">Contact</h4>

//             <p>Iten, Emc, Kenya</p>
//             <p>bookings@koshhotel.com</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }