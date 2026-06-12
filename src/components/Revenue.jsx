export default function RevenueChart() {
  const data = [40, 65, 50, 80, 95, 70] // fake monthly revenue %
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-bold text-[#1E293B] mb-4">Revenue This Month</h3>
      <div className="flex items-end gap-4 h-40">
        {data.map((h, i) => (
          <div key={i} className="w-12 bg-[#0D9488] rounded-t" style={{height: `${h}%`}}></div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">Ksh 1.2M total</p>
    </div>
  )
}