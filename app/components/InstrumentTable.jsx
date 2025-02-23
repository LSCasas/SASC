import React from "react";
import InstrumentFilters from "./InstrumentFilters";
import ExportButtons from "./TeacherExportButtons";
import Link from "next/link";

export default function InstrumentTable() {
  const instruments = [
    {
      id: 1,
      firstName: "Juan Carlos",
      lastName: "Pérez Sánchez",
      instrument: "Violín",
      ownerId: "A001",
    },
    {
      id: 2,
      firstName: "Ana Sofía",
      lastName: "Gómez Herrera",
      instrument: "Viola",
      ownerId: "A002",
    },
    {
      id: 3,
      firstName: "Carlos Eduardo",
      lastName: "Ramírez López",
      instrument: "Cello",
      ownerId: "A003",
    },
    {
      id: 4,
      firstName: "María José",
      lastName: "Torres Martínez",
      instrument: "Contrabajo",
      ownerId: "A004",
    },
    {
      id: 5,
      firstName: "Luis Fernando",
      lastName: "Fernández García",
      instrument: "Flauta",
      ownerId: "A005",
    },
  ];

  return (
    <div className="mt-6">
      <InstrumentFilters />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Instrumento</th>
              <th className="p-3 border-b text-black">Id</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Apellidos</th>
            </tr>
          </thead>
          <tbody>
            {instruments.length > 0 ? (
              instruments.map((instrument) => (
                <tr key={instrument.id}>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeInstrumentos">
                      {instrument.id}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeInstrumentos">
                      {instrument.instrument}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeInstrumentos">
                      {instrument.ownerId}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeInstrumentos">
                      {instrument.firstName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeInstrumentos">
                      {instrument.lastName}
                    </Link>
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
          <ExportButtons data={instruments} />
        </div>
      </div>
    </div>
  );
}
