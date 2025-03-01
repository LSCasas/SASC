import React, { useEffect, useState } from "react";
import { getAllCampuses } from "../api/campus";
import CampusFilters from "./CampusFilters";
import ExportButtons from "./TeacherExportButtons";
import Link from "next/link";

export default function CampusTable() {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const data = await getAllCampuses();
        const activeCampuses = data.filter((campus) => !campus.isAchive);
        setCampuses(activeCampuses);
      } catch (error) {
        console.error("Error al obtener los campus:", error);
      }
    };

    fetchCampuses();
  }, []);

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
            {campuses.length > 0 ? (
              campuses.map((campus, index) => (
                <tr
                  key={campus._id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeSedes?id=${campus._id}`}>
                      {campus.name}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeSedes?id=${campus._id}`}>
                      {campus.address}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeSedes?id=${campus._id}`}>
                      {campus.contactPhone}
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
        <span className="text-gray-600">
          {campuses.length} de {campuses.length}
        </span>
        <button className="opacity-50 cursor-not-allowed">
          <h1 className="text-black"> ▶︎ </h1>
        </button>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={campuses} />
        </div>
      </div>
    </div>
  );
}
