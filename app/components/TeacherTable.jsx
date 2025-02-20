import React from "react";
import TeacherFilters from "./TeacherFilters";
import ExportButtons from "./ExportButtons";
import Link from "next/link";

export default function TeacherTable() {
  const teachers = [
    {
      id: 1,
      firstName: "Juan Carlos",
      lastName: "Pérez Sánchez",
      contact: "5551234567",
    },
    {
      id: 2,
      firstName: "Ana Sofía",
      lastName: "Gómez Herrera",
      contact: "5552345678",
    },
    {
      id: 3,
      firstName: "Carlos Eduardo",
      lastName: "Ramírez López",
      contact: "5553456789",
    },
    {
      id: 4,
      firstName: "María José",
      lastName: "Torres Martínez",
      contact: "5554567890",
    },
    {
      id: 5,
      firstName: "Luis Fernando",
      lastName: "Fernández García",
      contact: "5555678901",
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
              <th className="p-3 border-b text-black">Apellidos</th>
              <th className="p-3 border-b text-black">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeDocentes">{teacher.id}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeDocentes">
                      {teacher.firstName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeDocentes">{teacher.lastName}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeDocentes">{teacher.contact}</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-black">
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
