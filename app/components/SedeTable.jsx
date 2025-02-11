import React from "react";
import SedeFilters from "./SedeFilters";
import ExportButtons from "./ExportButtons";
import Link from "next/link";

export default function SedeTable() {
  const Sedes = [
    {
      id: 1,
      firstName: "Juan Carlos",
      lastName: "Pérez Sánchez",
      campus: "Sede Central",
      address: "Av. Principal 123, Ciudad Central",
      phone: "123-456-7890",
    },
    {
      id: 2,
      firstName: "Ana Sofía",
      lastName: "Gómez Herrera",
      campus: "Sede Norte",
      address: "Calle Norte 456, Ciudad Norte",
      phone: "987-654-3210",
    },
    {
      id: 3,
      firstName: "Carlos Eduardo",
      lastName: "Ramírez López",
      campus: "Sede Sur",
      address: "Av. Sur 789, Ciudad Sur",
      phone: "456-789-0123",
    },
    {
      id: 4,
      firstName: "María José",
      lastName: "Torres Martínez",
      campus: "Sede Este",
      address: "Calle Este 321, Ciudad Este",
      phone: "321-654-9870",
    },
    {
      id: 5,
      firstName: "Luis Fernando",
      lastName: "Fernández García",
      campus: "Sede Oeste",
      address: "Av. Oeste 789, Ciudad Oeste",
      phone: "789-012-3456",
    },
  ];

  return (
    <div className="mt-6">
      <SedeFilters />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre (Sede)</th>
              <th className="p-3 border-b text-black">Dirección</th>
              <th className="p-3 border-b text-black">Coordinador</th>
              <th className="p-3 border-b text-black">Apellido</th>
              <th className="p-3 border-b text-black">Teléfono de Contacto</th>
            </tr>
          </thead>
          <tbody>
            {Sedes.length > 0 ? (
              Sedes.map((Sede) => (
                <tr key={Sede.id} className="cursor-pointer hover:bg-gray-100">
                  <td className="p-3 border-b">
                    <Link href="/formularioDeSedes">{Sede.id}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeSedes">{Sede.campus}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeSedes">{Sede.address}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeSedes">{Sede.firstName}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeSedes">{Sede.lastName}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeSedes">{Sede.phone}</Link>
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
          <ExportButtons data={Sedes} />
        </div>
      </div>
    </div>
  );
}
