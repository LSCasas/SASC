import React, { useEffect, useState } from "react";
import TutorFilters from "./TutorFilters";
import ExportButtons from "./TutorExportButtons";
import { getCurrentUser } from "../api/user";
import { getTutorsByCampusId } from "../api/tutor";

export default function TutorTable() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [classSearch, setClassSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");

  useEffect(() => {
    async function fetchTutors() {
      try {
        const user = await getCurrentUser();
        const campusId = user.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let tutorsData = await getTutorsByCampusId(campusId);
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

    const matchesStudent =
      studentSearch === "" ||
      tutor.children.some((child) =>
        child.firstName.toLowerCase().includes(studentSearch.toLowerCase())
      );

    const matchesClass =
      classSearch === "" ||
      tutor.children.some((child) =>
        child.ClassId.name.toLowerCase().includes(classSearch.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "active"
        ? tutor.isArchive === false
        : tutor.isArchive === true;

    return matchesName && matchesStudent && matchesClass && matchesStatus;
  });

  const sortedTutors = filteredTutors.sort((a, b) => {
    const firstChildA = a.children[0] || {};
    const firstChildB = b.children[0] || {};

    const classComparison =
      firstChildA.ClassId?.name?.localeCompare(firstChildB.ClassId?.name) || 0;
    if (classComparison !== 0) return classComparison;

    return firstChildA.lastName?.localeCompare(firstChildB.lastName) || 0;
  });

  return (
    <div className="mt-6">
      <TutorFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        studentSearch={studentSearch}
        setStudentSearch={setStudentSearch}
        classSearch={classSearch}
        setClassSearch={setClassSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="overflow-y-auto h-[60vh]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre Tutor</th>
              <th className="p-3 border-b text-black">Apellidos Tutor</th>
              <th className="p-3 border-b text-black">Nombre estudiante</th>
              <th className="p-3 border-b text-black">Apellidos estudiante</th>
              <th className="p-3 border-b text-black">
                Clase(s) del estudiante
              </th>
              <th className="p-3 border-b text-black">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {sortedTutors.length > 0 ? (
              sortedTutors.map((tutor, index) => {
                const childrenNames = tutor.children
                  .map((child) => child.firstName)
                  .join(", ");
                const childrenLastNames = tutor.children
                  .map((child) => child.lastName)
                  .join(", ");
                const childrenClasses = tutor.children
                  .map((child) => child.ClassId.name)
                  .join(", ");

                return (
                  <tr key={tutor._id}>
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{tutor.name}</td>
                    <td className="p-3 border-b">{tutor.lastname}</td>
                    <td className="p-3 border-b">
                      {childrenNames || "No disponible"}
                    </td>
                    <td className="p-3 border-b">
                      {childrenLastNames || "No disponible"}
                    </td>
                    <td className="p-3 border-b">
                      {childrenClasses || "No disponible"}
                    </td>
                    <td className="p-3 border-b">
                      {tutor.phone ? tutor.phone : "No disponible"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center text-black">
                  No hay registros disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ExportButtons data={sortedTutors} />
    </div>
  );
}
