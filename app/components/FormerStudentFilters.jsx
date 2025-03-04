import React from "react";

export default function FormerStudentFilters({
  setSearchName,
  setSearchClass,
  setSelectedGender,
  setInstrumentStatus,
  setStudentStatus,
}) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md text-black">
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="flex-1 min-w-[150px] p-2 border rounded"
        onChange={(e) => setSearchName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Buscar por clase"
        className="flex-1 min-w-[150px] p-2 border rounded"
        onChange={(e) => setSearchClass(e.target.value)}
      />
      <select
        className="flex-1 min-w-[150px] p-2 border rounded"
        onChange={(e) => setSelectedGender(e.target.value)}
      >
        <option value="">Seleccionar género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
      </select>

      <select
        className="flex-1 min-w-[150px] p-2 border rounded"
        onChange={(e) => setInstrumentStatus(e.target.value)}
      >
        <option value="">Estado del instrumento</option>
        <option value="Devuelto">Devuelto</option>
        <option value="No devuelto">No devuelto</option>
      </select>

      <select
        className="flex-1 min-w-[150px] p-2 border rounded"
        onChange={(e) => setStudentStatus(e.target.value)}
      >
        <option value="">Estado del alumno</option>
        <option value="baja temporal">Baja Temporal</option>
        <option value="baja total">Baja Total</option>
        <option value="abandono voluntario">Abandono Voluntario</option>
        <option value="finalizacion de estudios">
          Finalización de Estudios
        </option>
      </select>
    </div>
  );
}
