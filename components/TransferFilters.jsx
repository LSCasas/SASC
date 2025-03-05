import React from "react";

export default function TransferFilters({
  nameFilter,
  setNameFilter,
  classFilter,
  setClassFilter,
  genderFilter,
  setGenderFilter,
  locationFilter,
  setLocationFilter,
}) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md text-black">
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <input
        type="text"
        placeholder="Buscar por clase"
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={classFilter}
        onChange={(e) => setClassFilter(e.target.value)}
      />
      <select
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
      >
        <option value="">Seleccionar género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
      </select>
      <input
        type="text"
        placeholder="Buscar por sede de envío"
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
      />
    </div>
  );
}
