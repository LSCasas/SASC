import React, { useEffect, useState } from "react";
import { getAllCampuses } from "../api/campus";
import CampusFilters from "./CampusFilters";
import ExportButtons from "./CampusExportButtons";
import { useRouter } from "next/router";

export default function CampusTable() {
  const [campuses, setCampuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const router = useRouter();

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const data = await getAllCampuses();
        setCampuses(data);
      } catch (error) {
        console.error("Error al obtener los campus:", error);
      }
    };

    fetchCampuses();
  }, []);

  const filteredCampuses = campuses.filter((campus) => {
    const matchesSearch = campus.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "active" ? !campus.isAchive : campus.isAchive;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mt-6">
      <CampusFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="overflow-y-auto h-[55vh]">
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
            {filteredCampuses.length > 0 ? (
              filteredCampuses.map((campus, index) => (
                <tr
                  key={campus._id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    router.push(`/formularioDeSedes?id=${campus._id}`)
                  }
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{campus.name}</td>
                  <td className="p-3 border-b">{campus.address}</td>
                  <td className="p-3 border-b">{campus.contactPhone}</td>
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
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={filteredCampuses} />
        </div>
      </div>
    </div>
  );
}
