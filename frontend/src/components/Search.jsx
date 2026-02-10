import React from "react";

function Search() {
  return (
    <div className="w-full min-h-[30vh] flex flex-col items-center justify-center bg-slate-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {" "}
        CIT - Event Hub
      </h2>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        College in Tamil Nadu, India
      </h2>

      <div className="flex w-[65%] md:w-[20%] lg:w-[10%] max-w-2xl h-10 rounded-full shadow-md overflow-hidden bg-white">
        <input
          type="text"
          placeholder="Search events..."
          className="flex-1 px-4 py-1 text-gray-700 outline-none text-sm"
        />

        <button className="bg-yellow-400 px-4 py-1 text-black font-semibold text-sm hover:bg-yellow-500 transition">
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
