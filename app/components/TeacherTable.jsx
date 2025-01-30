import React from "react";
import TeacherFilters from "./TeacherFilters";
import ExportButtons from "./ExportButtons";

export default function TeacherTable() {
  const teachers = [
    {
      id: 1,
      name: "Juan Carlos Pérez Sánchez",
      instrument: "Guitarra",
      contact: "5551234567", // Número de contacto con 10 dígitos
    },
    {
      id: 2,
      name: "Ana Sofía Gómez Herrera",
      instrument: "Piano",
      contact: "5552345678", // Número de contacto con 10 dígitos
    },
    {
      id: 3,
      name: "Carlos Eduardo Ramírez López",
      instrument: "Batería",
      contact: "5553456789", // Número de contacto con 10 dígitos
    },
    {
      id: 4,
      name: "María José Torres Martínez",
      instrument: "Violín",
      contact: "5554567890", // Número de contacto con 10 dígitos
    },
    {
      id: 5,
      name: "Luis Fernando Fernández García",
      instrument: "Trompeta",
      contact: "5555678901", // Número de contacto con 10 dígitos
    },
  ];

  return (
    <div className="mt-6">
      <TeacherFilters />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Clase que imparte</th>
              <th className="p-3 border-b text-black">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="p-3 border-b">{teacher.id}</td>
                  <td className="p-3 border-b">{teacher.name}</td>
                  <td className="p-3 border-b">{teacher.instrument}</td>
                  <td className="p-3 border-b">{teacher.contact}</td>{" "}
                  {/* Número de contacto con 10 dígitos */}
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
          <ExportButtons data={teachers} />
        </div>
      </div>
    </div>
  );
}
