import React from "react";
import { useRouter } from "next/router";

const campus = [
  { id: 1, name: "Sede Cantera" },
  { id: 2, name: "Sede Xahuento" },
  { id: 3, name: "Sede Teyahualco" },
  { id: 4, name: "Sede Central" },
  { id: 5, name: "Sede Paseos" },
  { id: 6, name: "Sede 10 de Junio" },
  { id: 7, name: "Sede El Dorado" },
  { id: 8, name: "Sede Cantera" },
];

export default function CampusCard() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/alumnos");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
      {campus.map((campus) => (
        <div
          key={campus.id}
          className="cursor-pointer p-6 text-center bg-white shadow-lg rounded-2xl hover:shadow-xl transition border border-gray-200"
          onClick={handleRedirect}
        >
          <h2 className="text-lg font-semibold text-gray-700">{campus.name}</h2>
        </div>
      ))}
    </div>
  );
}
