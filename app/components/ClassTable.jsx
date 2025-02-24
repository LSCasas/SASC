import React, { useEffect, useState } from "react";
import ExportButtons from "./TeacherExportButtons";
import ClassFilters from "./ClassFilters";
import Link from "next/link";
import { getUserById } from "../api/user";
import { getClassesByCampusId } from "../api/class";

export default function ClassTable() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");

  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 20;

  useEffect(() => {
    async function fetchClasses() {
      try {
        const user = await getUserById();
        const campusId = user.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let classData = await getClassesByCampusId(campusId);

        // Ordenar por nombre en orden alfabético
        classData = classData.sort((a, b) => a.name.localeCompare(b.name));

        setClasses(classData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchClasses();
  }, []);

  if (loading) return <p className="text-center text-black">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const filteredClasses = classes.filter((classItem) => {
    const matchesName = classItem.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "active"
        ? classItem.isAchive === false
        : classItem.isAchive === true;

    return matchesName && matchesStatus;
  });

  const totalRecords = filteredClasses.length;
  const startIndex = currentPage * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);

  const displayedClasses = filteredClasses.slice(startIndex, endIndex);

  const handleLoadNext = () => {
    if ((currentPage + 1) * recordsPerPage < filteredClasses.length) {
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
      <ClassFilters />
      <div className="overflow-y-auto md:h-[45vh]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Profesor</th>
              <th className="p-3 border-b text-black">Generación</th>
            </tr>
          </thead>
          <tbody>
            {displayedClasses.length > 0 ? (
              displayedClasses.map((classItem, index) => (
                <tr key={classItem._id}>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeClases?id=${classItem._id}`}>
                      {startIndex + index + 1}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeClases?id=${classItem._id}`}>
                      {classItem.name}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeClases?id=${classItem._id}`}>
                      {classItem.teacherId
                        ? `${classItem.teacherId.firstName} ${classItem.teacherId.lastName}`
                        : "Sin asignar"}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeClases?id=${classItem._id}`}>
                      {classItem.generation}
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
          <ExportButtons data={displayedClasses} allClasses={filteredClasses} />
        </div>
      </div>
    </div>
  );
}
