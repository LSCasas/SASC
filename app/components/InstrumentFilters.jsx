import React from "react";

export default function Filters() {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md text-black">
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Buscar por id"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Buscar por propietario"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
      <select className="p-2 border rounded">
        <option value="active">Activa</option>
        <option value="inactive">Baja</option>
      </select>
    </div>
  );
}
