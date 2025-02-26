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

  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 20;

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

  const totalRecords = filteredTeachers.length;
  const startIndex = currentPage * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);

  const displayedTeachers = filteredTeachers.slice(startIndex, endIndex);

  const handleLoadNext = () => {
    if ((currentPage + 1) * recordsPerPage < filteredTeachers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLoadPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-6">
      <TeacherFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="overflow-y-auto md:h-[45vh]">
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
            {displayedTeachers.length > 0 ? (
              displayedTeachers.map((teacher, index) => (
                <tr key={teacher._id}>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeDocentes?id=${teacher._id}`}>
                      {startIndex + index + 1}
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
      <div className="mt-4 p-4 bg-gray-100 rounded-lg flex items-center justify-between">
        <button
          onClick={handleLoadPrev}
          disabled={currentPage === 0}
          className={`${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <h1 className="text-black"> ◀︎ </h1>
        </button>
        <span className="text-gray-600">
          {startIndex + 1}–{endIndex} de {totalRecords}
        </span>
        <button
          onClick={handleLoadNext}
          disabled={endIndex === totalRecords}
          className={`${
            endIndex === totalRecords ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <h1 className="text-black"> ▶︎ </h1>
        </button>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons
            data={displayedTeachers}
            allTeachers={filteredTeachers}
          />
        </div>
      </div>
    </div>
  );
}
