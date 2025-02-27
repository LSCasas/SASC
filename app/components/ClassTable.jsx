import React, { useEffect, useState } from "react";
import ExportButtons from "./ClassExportButtons";
import ClassFilters from "./ClassFilters";
import Link from "next/link";
import { getUserById } from "../api/user";
import { getClassesByCampusId } from "../api/class";

export default function ClassTable() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [generationFilter, setGenerationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");

  useEffect(() => {
    async function fetchClasses() {
      try {
        setLoading(true);
        const user = await getUserById();
        const campusId = user?.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let classData = await getClassesByCampusId(campusId);

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
    const matchesGeneration = generationFilter
      ? classItem.generation
          .toLowerCase()
          .includes(generationFilter.toLowerCase())
      : true;
    const matchesStatus =
      statusFilter === "active" ? !classItem.isAchive : classItem.isAchive;
    return matchesName && matchesGeneration && matchesStatus;
  });

  return (
    <div className="mt-6">
      <ClassFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        generationFilter={generationFilter}
        setGenerationFilter={setGenerationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="overflow-y-auto h-[50vh]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Nombre</th>
              <th className="p-3 border-b">Profesor</th>
              <th className="p-3 border-b">Generación</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classItem, index) => (
                <tr key={classItem._id}>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeClases?id=${classItem._id}`}>
                      {index + 1}
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
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={filteredClasses} allClasses={filteredClasses} />
        </div>
      </div>
    </div>
  );
}
