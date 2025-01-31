import React from "react";
import FormerStudentFilters from "./FormerStudentFilters";
import ExportButtons from "./ExportButtons";

export default function ExStudentTable() {
  const students = [
    {
      id: 1,
      name: "Juan Carlos Pérez Sánchez",
      instrument: "Guitarra",
      genre: "Masculino",
      age: 16,
      status: "Baja Temporal",
      instrumentReturned: "Sí",
    },
    {
      id: 2,
      name: "Ana Sofía Gómez Herrera",
      instrument: "Piano",
      genre: "Femenino",
      age: 18,
      status: "Baja Total",
      instrumentReturned: "No",
    },
    {
      id: 3,
      name: "Carlos Eduardo Ramírez López",
      instrument: "Batería",
      genre: "Masculino",
      age: 17,
      status: "Abandono Voluntario",
      instrumentReturned: "Sí",
    },
    {
      id: 4,
      name: "María José Torres Martínez",
      instrument: "Violín",
      genre: "Femenino",
      age: 15,
      status: "Finalización de Estudios",
      instrumentReturned: "No",
    },
  ];

  return (
    <div className="mt-6">
      <FormerStudentFilters />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Instrumento</th>
              <th className="p-3 border-b text-black">Género</th>
              <th className="p-3 border-b text-black">Edad</th>
              <th className="p-3 border-b text-black">Estado</th>
              <th className="p-3 border-b text-black">Instrumento Devuelto</th>
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
                  <td className="p-3 border-b">{student.age}</td>
                  <td className="p-3 border-b">{student.status}</td>
                  <td className="p-3 border-b">{student.instrumentReturned}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center text-black">
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
