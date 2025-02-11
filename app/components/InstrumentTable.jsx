import React from "react";
import InstrumentFilters from "./InstrumentFilters";
import ExportButtons from "./ExportButtons";
import Link from "next/link";
export default function InstrumentTable() {
  const instruments = [
    {
      id: 1,
      instrument: "Violín",
      ownerId: "A001",
      owner: "Juan Carlos Pérez Sánchez",
    },
    {
      id: 2,
      instrument: "Viola",
      ownerId: "A002",
      owner: "Ana Sofía Gómez Herrera",
    },
    {
      id: 3,
      instrument: "Cello",
      ownerId: "A003",
      owner: "Carlos Eduardo Ramírez López",
    },
    {
      id: 4,
      instrument: "Contrabajo",
      ownerId: "A004",
      owner: "María José Torres Martínez",
    },
    {
      id: 5,
      instrument: "Flauta",
      ownerId: "A005",
      owner: "Luis Fernando Fernández García",
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
              <th className="p-3 border-b text-black">Propietario</th>
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
                      {instrument.owner}
                    </Link>
                  </td>
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
          <ExportButtons data={instruments} />
        </div>
      </div>
    </div>
  );
}
