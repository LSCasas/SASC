import React from "react";
import CoordinatorFilters from "./CoordinatorFilters";
import ExportButtons from "./ExportButtons";
import Link from "next/link";

export default function CoordinatorTable() {
  const Sedes = [
    {
      id: 1,
      Name: "Juan Carlos",
      lastname: "Pérez Sánchez",
      email: "sede@example.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      Name: "Ana Sofía ",
      lastname: "Pérez Sánchez",
      email: "sede@example.com",
      phone: "987-654-3210",
    },
    {
      id: 3,
      Name: "Carlos Eduardo ",
      lastname: "Pérez Sánchez",
      email: "sede@example.com",
      phone: "456-789-0123",
    },
    {
      id: 4,
      Name: "María José ",
      lastname: "Pérez Sánchez",
      email: "sede@example.com",
      phone: "321-654-9870",
    },
    {
      id: 5,
      Name: "Luis Fernando ",
      lastname: "Pérez Sánchez",
      email: "sede@example.com",
      phone: "789-012-3456",
    },
  ];

  return (
    <div className="mt-6">
      <CoordinatorFilters />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Apellido</th>
              <th className="p-3 border-b text-black">Email</th>
              <th className="p-3 border-b text-black">Teléfono de Contacto</th>
            </tr>
          </thead>
          <tbody>
            {Sedes.length > 0 ? (
              Sedes.map((Sede) => (
                <tr key={Sede.id} className="cursor-pointer hover:bg-gray-100">
                  <td className="p-3 border-b">
                    <Link href="/formularioDeCoordinadores">{Sede.id}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeCoordinadores">{Sede.Name}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeCoordinadores">
                      {Sede.lastname}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeCoordinadores">{Sede.email}</Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href="/formularioDeCoordinadores">{Sede.phone}</Link>
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
          <ExportButtons data={Sedes} />
        </div>
      </div>
    </div>
  );
}
