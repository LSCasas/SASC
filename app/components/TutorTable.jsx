import React, { useEffect, useState } from "react";
import Filters from "./TutorFilters";
import ExportButtons from "./TeacherExportButtons";
import Link from "next/link";
import { getUserById } from "../api/user";
import { getTutorsByCampusId } from "../api/tutor";

export default function TutorTable() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");

  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 20;

  useEffect(() => {
    async function fetchTutors() {
      try {
        const user = await getUserById();
        const campusId = user.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let tutorsData = await getTutorsByCampusId(campusId);

        // Ordenar por apellido en orden alfabético
        tutorsData = tutorsData.sort((a, b) =>
          a.lastname.localeCompare(b.lastname)
        );

        setTutors(tutorsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTutors();
  }, []);

  if (loading) return <p className="text-center text-black">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const filteredTutors = tutors.filter((tutor) => {
    const matchesName =
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.lastname.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "active"
        ? tutor.isArchive === false
        : tutor.isArchive === true;

    return matchesName && matchesStatus;
  });

  const totalRecords = filteredTutors.length;
  const startIndex = currentPage * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);

  const displayedTutors = filteredTutors.slice(startIndex, endIndex);

  const handleLoadNext = () => {
    if ((currentPage + 1) * recordsPerPage < filteredTutors.length) {
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
      <Filters
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
              <th className="p-3 border-b text-black">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {displayedTutors.length > 0 ? (
              displayedTutors.map((tutor, index) => (
                <tr key={tutor._id}>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeTutores?id=${tutor._id}`}>
                      {startIndex + index + 1}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeTutores?id=${tutor._id}`}>
                      {tutor.name}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeTutores?id=${tutor._id}`}>
                      {tutor.lastname}
                    </Link>
                  </td>

                  <td className="p-3 border-b">
                    {/* Asegúrate de que childContact esté disponible */}
                    {tutor.phone ? tutor.phone : "No disponible"}
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
          <ExportButtons data={displayedTutors} allTutors={filteredTutors} />
        </div>
      </div>
    </div>
  );
}
