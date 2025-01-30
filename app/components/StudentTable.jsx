import React from "react";
import Filters from "./Filters";
import ExportButtons from "./ExportButtons";

export default function StudentTable() {
  const students = [
    {
      id: 1,
      name: "Juan Carlos Pérez Sánchez",
      instrument: "Guitarra",
      age: 16,
    },
    { id: 2, name: "Ana Sofía Gómez Herrera", instrument: "Piano", age: 18 },
    {
      id: 3,
      name: "Carlos Eduardo Ramírez López",
      instrument: "Batería",
      age: 17,
    },
    {
      id: 4,
      name: "María José Torres Martínez",
      instrument: "Violín",
      age: 15,
    },
    {
      id: 5,
      name: "Luis Fernando Fernández García",
      instrument: "Trompeta",
      age: 19,
    },
  ];

  return (
    <div className="mt-6">
      <Filters />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Instrumento</th>
              <th className="p-3 border-b text-black">Edad</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td className="p-3 border-b">{student.id}</td>
                  <td className="p-3 border-b">{student.name}</td>
                  <td className="p-3 border-b">{student.instrument}</td>
                  <td className="p-3 border-b">{student.age}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-black">
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
