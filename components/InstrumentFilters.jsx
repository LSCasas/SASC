import React from "react";

export default function InstrumentFilters({
  searchTerm,
  setSearchTerm,
  ownerSearchTerm,
  setOwnerSearchTerm,
  internalIdSearchTerm,
  setInternalIdSearchTerm,
  statusFilter,
  setStatusFilter,
  ownerFilter,
  setOwnerFilter,
}) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md text-black">
      <input
        type="text"
        placeholder="Buscar por instrumento"
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Buscar por id interno"
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={internalIdSearchTerm}
        onChange={(e) => setInternalIdSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Buscar por propietario"
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={ownerSearchTerm}
        onChange={(e) => setOwnerSearchTerm(e.target.value)}
      />

      <select
        className="p-2 border rounded"
        value={ownerFilter}
        onChange={(e) => setOwnerFilter(e.target.value)}
      >
        <option value="">Tiene Propietario</option>
        <option value="yes">Sí</option>
        <option value="no">No</option>
      </select>
      <select
        className="p-2 border rounded"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="active">Activa</option>
        <option value="inactive">Baja</option>
      </select>
    </div>
  );
}
