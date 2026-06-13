import ServiceCard from "../components/ServiceCard";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1
        className="
        text-4xl
        font-bold
        text-teal-700
        mb-8
        "
      >
        Guest Service Portal
      </h1>

      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
        "
      >

        <ServiceCard
          title="Room Service"
          description="Order food and beverages."
          route="/room-service"
        />

        <ServiceCard
          title="Housekeeping"
          description="Request room cleaning."
          route="/housekeeping"
        />

        <ServiceCard
          title="Amenities"
          description="Book hotel facilities."
          route="/amenities"
        />

        <ServiceCard
          title="Request History"
          description="View previous requests."
          route="/requests"
        />

      </div>

    </div>
  );
}

export default Dashboard;