import React from "react";

export default function TutorFilters({
  searchTerm,
  setSearchTerm,
  studentSearch,
  setStudentSearch,
  classSearch,
  setClassSearch,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md text-black">
      <input
        type="text"
        placeholder="Buscar por tutor"
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Buscar por estudiante"
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={studentSearch}
        onChange={(e) => setStudentSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Buscar por clase"
        className="flex-1 min-w-[150px] p-2 border rounded"
        value={classSearch}
        onChange={(e) => setClassSearch(e.target.value)}
      />
      <select
        className="p-2 border rounded"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="active">Activo</option>
        <option value="inactive">Baja</option>
      </select>
    </div>
  );
}
