function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full">
      <input
        type="search"
        placeholder="Search rooms..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;