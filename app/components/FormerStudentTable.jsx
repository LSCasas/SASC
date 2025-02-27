import React from "react";
import FormerStudentFilters from "./FormerStudentFilters";
import ExportButtons from "./TeacherExportButtons";
import Link from "next/link";

export default function ExStudentTable() {
  const students = [
    {
      id: 1,
      firstName: "Juan Carlos",
      lastName: "Pérez Sánchez",
      instrument: "Guitarra",
      genre: "Masculino",
      status: "Baja Temporal",
      instrumentReturned: "Sí",
    },
    {
      id: 2,
      firstName: "Ana Sofía",
      lastName: "Gómez Herrera",
      instrument: "Piano",
      genre: "Femenino",
      status: "Baja Total",
      instrumentReturned: "No",
    },
    {
      id: 3,
      firstName: "Carlos Eduardo",
      lastName: "Ramírez López",
      instrument: "Batería",
      genre: "Masculino",
      status: "Abandono Voluntario",
      instrumentReturned: "Sí",
    },
    {
      id: 4,
      firstName: "María José",
      lastName: "Torres Martínez",
      instrument: "Violín",
      genre: "Femenino",
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
              <th className="p-3 border-b text-black">Apellido</th>
              <th className="p-3 border-b text-black">Ultima Clase</th>
              <th className="p-3 border-b text-black">Estado</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeExAlumnos">{student.id}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeExAlumnos">
                      {student.firstName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeExAlumnos">
                      {student.lastName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeExAlumnos">
                      {student.instrument}
                    </Link>
                  </td>

                  <td className="p-3 border-b">
                    <Link href="/formularioDeExAlumnos">{student.status}</Link>
                  </td>
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
