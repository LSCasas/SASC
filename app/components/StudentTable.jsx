import React from "react";
import Filters from "./StudentFilters";
import ExportButtons from "./TeacherExportButtons";
import Link from "next/link";

export default function StudentTable() {
  const students = [
    {
      id: 1,
      firstName: "Juan Carlos",
      lastName: "Pérez Sánchez",
      instrument: "Guitarra",
      genre: "Masculino",
    },
    {
      id: 2,
      firstName: "Ana Sofía",
      lastName: "Gómez Herrera",
      instrument: "Piano",
      genre: "Femenino",
    },
    {
      id: 3,
      firstName: "Carlos Eduardo",
      lastName: "Ramírez López",
      instrument: "Batería",
      genre: "Masculino",
    },
    {
      id: 4,
      firstName: "María José",
      lastName: "Torres Martínez",
      instrument: "Violín",
      genre: "Femenino",
    },
    {
      id: 5,
      firstName: "Luis Fernando",
      lastName: "Fernández García",
      instrument: "Trompeta",
      genre: "Masculino",
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
              <th className="p-3 border-b text-black">Apellidos</th>
              <th className="p-3 border-b text-black">Instrumento</th>
              <th className="p-3 border-b text-black">Género</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="p-3 border-b">
                    <Link href="/formularioDeAlumnos">{student.id}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeAlumnos">{student.firstName}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeAlumnos">{student.lastName}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeAlumnos">
                      {student.instrument}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeAlumnos">{student.genre}</Link>
                  </td>
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
