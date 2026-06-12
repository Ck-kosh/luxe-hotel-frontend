export default function DataTable({ columns, data }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full">
        <thead className="bg-[#0F766E] text-white">
          <tr>
            {columns.map(col => <th key={col} className="px-6 py-3 text-left text-sm font-semibold">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {Object.values(row).map((val, j) => <td key={j} className="px-6 py-4 text-[#1E293B]">{val}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}