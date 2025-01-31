import React from "react";
import TransferFilters from "./TransferFilters";
import ExportButtons from "./ExportButtons";

export default function StudentTable() {
  const students = [
    {
      id: 1,
      name: "Juan Carlos Pérez Sánchez",
      instrument: "Guitarra",
      genre: "Masculino",
      sendingLocation: "Cantera",
      receivingLocation: "Local",
    },
    {
      id: 2,
      name: "Ana Sofía Gómez Herrera",
      instrument: "Piano",
      genre: "Femenino",
      sendingLocation: "Sede Sur",
      receivingLocation: "Xahuento",
    },
    {
      id: 3,
      name: "Carlos Eduardo Ramírez López",
      instrument: "Batería",
      genre: "Masculino",
      sendingLocation: "Local",
      receivingLocation: "Local",
    },
    {
      id: 4,
      name: "María José Torres Martínez",
      instrument: "Violín",
      genre: "Femenino",
      sendingLocation: "Teyahualco",
      receivingLocation: "Local",
    },
    {
      id: 5,
      name: "Luis Fernando Fernández García",
      instrument: "Trompeta",
      genre: "Masculino",
      sendingLocation: "Sede Sur",
      receivingLocation: "Sede Sur",
    },
  ];

  return (
    <div className="mt-6">
      <TransferFilters />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Instrumento</th>
              <th className="p-3 border-b text-black">Género</th>
              <th className="p-3 border-b text-black">Sede de Envío</th>
              <th className="p-3 border-b text-black">Sede de Recepción</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td className="p-3 border-b">{student.id}</td>
                  <td className="p-3 border-b">{student.name}</td>
                  <td className="p-3 border-b">{student.instrument}</td>
                  <td className="p-3 border-b">{student.genre}</td>
                  <td className="p-3 border-b">{student.sendingLocation}</td>
                  <td className="p-3 border-b">{student.receivingLocation}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-black">
                  No hay registros disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded-lg flex items-center justify-between">
        <button className="opacity-50 cursor-not-allowed">
          <h1 className="text-black"> ◀︎ </h1>
        </button>
        <span className="text-gray-600">0–5 de 5</span>
        <button className="opacity-50 cursor-not-allowed">
          <h1 className="text-black"> ▶︎ </h1>
        </button>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={students} />
        </div>
      </div>
    </div>
  );
}
