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
        placeholder="Buscar por clase"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
      <select className="flex-1 min-w-[150px] p-2 border rounded">
        <option value="">Seleccionar género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
      </select>
      <select className="flex-1 min-w-[150px] p-2 border rounded">
        <option value="">Tiene Instrumento</option>
        <option value="Masculino">Si</option>
        <option value="Femenino">No</option>
      </select>
    </div>
  );
}
