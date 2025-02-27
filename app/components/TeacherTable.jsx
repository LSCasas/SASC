import React, { useEffect, useState } from "react";
import TeacherFilters from "./TeacherFilters";
import ExportButtons from "./TeacherExportButtons";
import Link from "next/link";
import { getUserById } from "../api/user";
import { getTeachersByCampusId } from "../api/teacher";

export default function TeacherTable() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const user = await getUserById();
        const campusId = user.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let teachersData = await getTeachersByCampusId(campusId);

        teachersData = teachersData.sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );

        setTeachers(teachersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTeachers();
  }, []);

  if (loading) return <p className="text-center text-black">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesName =
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "active"
        ? teacher.isAchive === false
        : teacher.isAchive === true;

    return matchesName && matchesStatus;
  });

  return (
    <div className="mt-6">
      <TeacherFilters
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
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher, index) => (
                <tr
                  key={teacher._id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeDocentes?id=${teacher._id}`}>
                      {index + 1}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeDocentes?id=${teacher._id}`}>
                      {teacher.firstName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeDocentes?id=${teacher._id}`}>
                      {teacher.lastName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeDocentes?id=${teacher._id}`}>
                      {teacher.phone}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeDocentes?id=${teacher._id}`}>
                      {teacher.email}
                    </Link>
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
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={filteredTeachers} />
        </div>
      </div>
    </div>
  );
}
