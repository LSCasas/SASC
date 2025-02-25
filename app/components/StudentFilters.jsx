import React from "react";

export default function Filters({ filters, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md text-black">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={onFilterChange}
        placeholder="Buscar por nombre"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
      <input
        type="text"
        name="className"
        value={filters.className}
        onChange={onFilterChange}
        placeholder="Buscar por clase"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
      <select
        name="gender"
        value={filters.gender}
        onChange={onFilterChange}
        className="flex-1 min-w-[150px] p-2 border rounded"
      >
        <option value="">Seleccionar género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
      </select>
      <select
        name="hasInstrument"
        value={filters.hasInstrument}
        onChange={onFilterChange}
        className="flex-1 min-w-[150px] p-2 border rounded"
      >
        <option value="">Tiene Instrumento</option>
        <option value="true">Sí</option>
        <option value="false">No</option>
      </select>
    </div>
  );
}
