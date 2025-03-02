import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/user";
import CoordinatorFilters from "./CoordinatorFilters";
import ExportButtons from "./CoordinatorExportButtons";
import Link from "next/link";

export default function CoordinatorTable() {
  const [coordinators, setCoordinators] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const data = await getAllUsers();
        const filteredUsers = data.filter(
          (user) =>
            user.role === "coordinator" ||
            (user.role === "admin" && user.adminType === "second")
        );
        setCoordinators(filteredUsers);
      } catch (error) {
        console.error(
          "Error al obtener los coordinadores y administradores:",
          error
        );
      }
    };

    fetchCoordinators();
  }, []);

  const filteredCoordinators = coordinators.filter((coordinator) => {
    const matchesSearch =
      coordinator.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordinator.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "active"
        ? !coordinator.isArchived
        : coordinator.isArchived;

    const matchesType = typeFilter === "" || coordinator.role === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="mt-6">
      <CoordinatorFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Apellido</th>
              <th className="p-3 border-b text-black">Teléfono</th>
              <th className="p-3 border-b text-black">Campus</th>
              <th className="p-3 border-b text-black">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoordinators.length > 0 ? (
              filteredCoordinators.map((coordinator, index) => (
                <tr
                  key={coordinator._id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">
                    <Link
                      href={`/formularioDeCoordinadores?id=${coordinator._id}`}
                    >
                      {coordinator.firstName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">{coordinator.lastName}</td>
                  <td className="p-3 border-b">{coordinator.phone}</td>
                  <td className="p-3 border-b">
                    {coordinator.role === "admin"
                      ? "Con acceso a todas las sedes"
                      : coordinator.campusId
                          .filter((campus) => !campus.isAchive)
                          .map((campus) => campus.name)
                          .join(", ")}
                  </td>
                  <td className="p-3 border-b">
                    {coordinator.role === "admin" ? "Admin" : "Coordinador"}
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
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={filteredCoordinators} />
        </div>
      </div>
    </div>
  );
}
