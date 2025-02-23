import React from "react";
import CampusFilters from "./CampusFilters";
import ExportButtons from "./TeacherExportButtons";
import Link from "next/link";

export default function CampusTable() {
  const campus = [
    {
      id: 1,
      campus: "campus Central",
      address: "Av. Principal 123, Ciudad Central",
      phone: "123-456-7890",
    },
    {
      id: 2,
      campus: "campus Norte",
      address: "Calle Norte 456, Ciudad Norte",
      phone: "987-654-3210",
    },
    {
      id: 3,
      campus: "campus Sur",
      address: "Av. Sur 789, Ciudad Sur",
      phone: "456-789-0123",
    },
    {
      id: 4,
      campus: "campus Este",
      address: "Calle Este 321, Ciudad Este",
      phone: "321-654-9870",
    },
    {
      id: 5,
      campus: "campus Oeste",
      address: "Av. Oeste 789, Ciudad Oeste",
      phone: "789-012-3456",
    },
  ];

  return (
    <div className="mt-6">
      <CampusFilters />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre (campus)</th>
              <th className="p-3 border-b text-black">Dirección</th>
              <th className="p-3 border-b text-black">Teléfono de Contacto</th>
            </tr>
          </thead>
          <tbody>
            {campus.length > 0 ? (
              campus.map((campus) => (
                <tr
                  key={campus.id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="p-3 border-b">
                    <Link href="/formularioDeSedes">{campus.id}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeSedes">{campus.campus}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeSedes">{campus.address}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeSedes">{campus.phone}</Link>
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
          <ExportButtons data={campus} />
        </div>
      </div>
    </div>
  );
}
