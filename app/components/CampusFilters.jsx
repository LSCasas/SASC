import React from "react";

export default function CampusFilters() {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md text-black">
      <input
        type="text"
        placeholder="Buscar por campus"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
    </div>
  );
}
