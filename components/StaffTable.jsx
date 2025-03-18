import React, { useEffect, useState } from "react";
import StaffFilters from "./StaffFilters";
import ExportButtons from "./StaffExportButtons";
import StaffAttendanceList from "./StaffAttendanceList";
import Link from "next/link";
import { getCurrentUser } from "../api/user";
import { getStaffsByCampusId } from "../api/staff";
import { useRouter } from "next/router";

export default function StaffTable() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const router = useRouter();

  useEffect(() => {
    async function fetchStaffs() {
      try {
        const user = await getCurrentUser();
        const campusId = user.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let staffsData = await getStaffsByCampusId(campusId);

        staffsData = staffsData.sort(
          (a, b) =>
            a.lastName.localeCompare(b.lastName) ||
            a.firstName.localeCompare(b.firstName)
        );

        setStaffs(staffsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStaffs();
  }, []);

  if (loading) return <p className="text-center text-black">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const filteredStaffs = staffs.filter((staff) => {
    const matchesName =
      staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "active"
        ? staff.isAchive === false
        : staff.isAchive === true;

    return matchesName && matchesStatus;
  });

  return (
    <div className="mt-6">
      <StaffFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="overflow-y-auto h-[50vh]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Apellidos</th>
              <th className="p-3 border-b text-black">Teléfono</th>
              <th className="p-3 border-b text-black">Correo</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaffs.length > 0 ? (
              filteredStaffs.map((staff, index) => (
                <tr
                  key={staff._id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    router.push(`/formularioDePersonal?id=${staff._id}`)
                  }
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{staff.firstName}</td>
                  <td className="p-3 border-b">{staff.lastName}</td>
                  <td className="p-3 border-b">{staff.phone}</td>
                  <td className="p-3 border-b">{staff.email}</td>
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
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={filteredStaffs} />
        </div>
      </div>
      <div>
        <div className="w-full">
          <StaffAttendanceList data={filteredStaffs} />
        </div>
      </div>
    </div>
  );
}
