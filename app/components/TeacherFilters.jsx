import React from "react";

export default function TeacherFilters() {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md text-black">
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Buscar por clase impartida"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
    </div>
  );
}
