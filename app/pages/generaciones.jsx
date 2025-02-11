import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function GenerationsPage() {
  const router = useRouter();

  const generaciones = [
    { nombre: "Generación 1", año: 2022 },
    { nombre: "Generación 2", año: 2023 },
    { nombre: "Generación 3", año: 2024 },
    { nombre: "Generación 4", año: 2025 },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#6C0036]">
            Generaciones
          </h1>
          <ul className="space-y-4">
            {generaciones.map((generacion, index) => (
              <li
                key={index}
                className="p-4 bg-white shadow-md rounded-lg text-center text-lg font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition"
                onClick={() => router.push("/alumnos")}
              >
                {generacion.nombre} - {generacion.año}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
