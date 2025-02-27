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
        <option value="">Estado del instrumento</option>
        <option value="Devuelto">Devuelto</option>
        <option value="No devuelto">No devuelto</option>
      </select>

      <select className="flex-1 min-w-[150px] p-2 border rounded">
        <option value="">Estado del alumno</option>
        <option value="Devuelto">Baja Temporal</option>
        <option value="No devuelto">Baja Total</option>
        <option value="Devuelto">Abandono Voluntario</option>
        <option value="No devuelto">Finalización de Estudios</option>
      </select>
    </div>
  );
}
