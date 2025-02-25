import React, { useEffect, useState } from "react";
import Filters from "./StudentFilters";
import ExportButtons from "./TeacherExportButtons";
import Link from "next/link";
import { getUserById } from "../api/user";
import { getStudentsByCampusId } from "../api/student";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
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

        // Ordenar estudiantes por apellido (lastName) en orden alfabético
        const sortedStudents = studentData.sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );

        setStudents(sortedStudents);
      } catch (err) {
        setError(err.message);
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
      <Filters />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Apellidos</th>
              <th className="p-3 border-b text-black">Clase</th>
              <th className="p-3 border-b text-black">Instrumento</th>
              <th className="p-3 border-b text-black">Género</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student._id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeAlumnos?id=${student._id}`}>
                      {index + 1}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeAlumnos?id=${student._id}`}>
                      {student.firstName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeAlumnos?id=${student._id}`}>
                      {student.lastName}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeAlumnos?id=${student._id}`}>
                      {student.ClassId?.name || "Sin clase"}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeAlumnos?id=${student._id}`}>
                      {student.hasInstrument ? "Sí" : "No"}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link href={`/formularioDeAlumnos?id=${student._id}`}>
                      {student.gender}
                    </Link>
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
          <ExportButtons data={students} />
        </div>
      </div>
    </div>
  );
}
