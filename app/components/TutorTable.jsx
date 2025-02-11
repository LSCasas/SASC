import React from "react";
import Filters from "./TutorFilters";
import ExportButtons from "./ExportButtons";
import Link from "next/link";

export default function TutorTable() {
  const parents = [
    {
      id: 1,
      firstName: "Juan Carlos",
      lastName: "Pérez Sánchez",
      childFirstName: "Pedro",
      childLastName: "Pérez Martínez",
      childContact: "5512345678",
    },
    {
      id: 2,
      firstName: "Ana Sofía",
      lastName: "Gómez Herrera",
      childFirstName: "Luis",
      childLastName: "Gómez Hernández",
      childContact: "5523456789",
    },
    {
      id: 3,
      firstName: "Carlos Eduardo",
      lastName: "Ramírez López",
      childFirstName: "Martín",
      childLastName: "Ramírez Torres",
      childContact: "5534567890",
    },
    {
      id: 4,
      firstName: "María José",
      lastName: "Torres Martínez",
      childFirstName: "Andrea",
      childLastName: "Torres Rodríguez",
      childContact: "5545678901",
    },
    {
      id: 5,
      firstName: "Luis Fernando",
      lastName: "Fernández García",
      childFirstName: "José",
      childLastName: "Fernández Ruiz",
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
              <th className="p-3 border-b text-black">Apellidos</th>
              <th className="p-3 border-b text-black">Tutor del estudiante</th>
              <th className="p-3 border-b text-black">
                Apellidos del estudiante
              </th>
              <th className="p-3 border-b text-black">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {parents.length > 0 ? (
              parents.map((parent) => (
                <tr key={parent.id}>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeTutores">{parent.id}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeTutores">{parent.firstName}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeTutores">{parent.lastName}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeTutores">
                      {parent.childFirstName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeTutores">
                      {parent.childLastName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">{parent.childContact}</td>
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
          <ExportButtons data={parents} />
        </div>
      </div>
    </div>
  );
}
