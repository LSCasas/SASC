import React, { useEffect, useState } from "react";
import FormerStudentFilters from "./FormerStudentFilters";
import ExportButtons from "./TeacherExportButtons";
import Link from "next/link";
import { getUserById } from "../api/user";
import { getStudentsByCampusId } from "../api/student";

export default function ExStudentTable() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true);
        const user = await getUserById();
        const campusId = user?.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        const studentData = await getStudentsByCampusId(campusId);

        if (studentData.length === 0) {
          setError("No se encontraron estudiantes para este campus.");
        } else {
          // Filtramos solo los estudiantes cuyo status no sea "activo"
          const formerStudents = studentData.filter(
            (student) => student.status !== "activo"
          );

          // Ordenamos a los estudiantes por apellido
          const sortedStudents = formerStudents.sort((a, b) =>
            a.lastName.localeCompare(b.lastName)
          );

          setStudents(sortedStudents);
          setFilteredStudents(sortedStudents);
        }
      } catch (err) {
        setError(err.message || "Hubo un problema al cargar los estudiantes.");
        console.error("Error al obtener los estudiantes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  if (loading) return <p className="text-center text-black">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="mt-6">
      <FormerStudentFilters />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Apellido</th>
              <th className="p-3 border-b text-black">Última Clase Tomada</th>
              <th className="p-3 border-b text-black">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student._id}>
                  <td className="p-3 border-b">{index + 1}</td>{" "}
                  {/* Numeración */}
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeExAlumnos?id=${student._id}`}>
                      {student.firstName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeExAlumnos?id=${student._id}`}>
                      {student.lastName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeExAlumnos?id=${student._id}`}>
                      {student.ClassId?.name || "Sin clase"}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeExAlumnos?id=${student._id}`}>
                      {student.status}
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
        <button className="opacity-50 cursor-not-allowed">
          <h1 className="text-black"> ◀︎ </h1>
        </button>
        <span className="text-gray-600">0–5 de 5</span>
        <button className="opacity-50 cursor-not-allowed">
          <h1 className="text-black"> ▶︎ </h1>
        </button>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={filteredStudents} />
        </div>
      </div>
    </div>
  );
}
