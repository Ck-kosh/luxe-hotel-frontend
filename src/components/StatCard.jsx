export default function StatCard({ title, value, icon = "" }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#0F766E] hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 uppercase">{title}</p>
          <p className="text-3xl font-bold text-[#1E293B] mt-2">{value}</p>
        </div>
        <span className="text-4xl text-[#F59E0B]">{icon}</span>
      </div>
    </div>
  )
}