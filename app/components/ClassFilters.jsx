import React from "react";

export default function ClassFilters({
  searchTerm,
  setSearchTerm,
  generationFilter,
  setGenerationFilter,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md text-black">
      <input
        type="text"
        placeholder="Buscar por Nombre"
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Buscar por Generación"
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={generationFilter}
        onChange={(e) => setGenerationFilter(e.target.value)}
      />
      <select
        className="p-2 border rounded"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="active">Activa</option>
        <option value="inactive">Dada de baja</option>
      </select>
    </div>
  );
}
