import React from "react";
import Filters from "./TutorFilters";
import ExportButtons from "./ExportButtons";
import Link from "next/link";
export default function TutorTable() {
  const parents = [
    {
      id: 1,
      name: "Juan Carlos Pérez Sánchez",
      childName: "Pedro Pérez Martínez",
      childContact: "5512345678",
    },
    {
      id: 2,
      name: "Ana Sofía Gómez Herrera",
      childName: "Luis Gómez Hernández",
      childContact: "5523456789",
    },
    {
      id: 3,
      name: "Carlos Eduardo Ramírez López",
      childName: "Martín Ramírez Torres",
      childContact: "5534567890",
    },
    {
      id: 4,
      name: "María José Torres Martínez",
      childName: "Andrea Torres Rodríguez",
      childContact: "5545678901",
    },
    {
      id: 5,
      name: "Luis Fernando Fernández García",
      childName: "José Fernández Ruiz",
      childContact: "5556789012",
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
              <th className="p-3 border-b text-black">Tutor del estudiante</th>
              <th className="p-3 border-b text-black">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {parents.length > 0 ? (
              parents.map((parent) => (
                <tr key={parent.id}>
                  <td className="p-3 border-b">
                    <Link href="/formulariodelTutor">{parent.id}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formulariodelTutor">{parent.name}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formulariodelTutor">{parent.childName}</Link>
                  </td>
                  <td className="p-3 border-b">{parent.childContact}</td>
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
          <ExportButtons data={parents} />
        </div>
      </div>
    </div>
  );
}
