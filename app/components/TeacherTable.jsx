import React, { useEffect, useState } from "react";
import TeacherFilters from "./TeacherFilters";
import ExportButtons from "./ExportButtons";
import Link from "next/link";
import { getUserById } from "../api/user";
import { getTeachersByCampusId } from "../api/teacher";

export default function TeacherTable() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const user = await getUserById();
        const campusId = user.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        const teachersData = await getTeachersByCampusId(campusId);
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

  // Filtra los docentes cuyo isAchive es false
  const activeTeachers = teachers.filter(
    (teacher) => teacher.isAchive === false
  );

  return (
    <div className="mt-6">
      <TeacherFilters />
      <div className="overflow-y-auto max-h-[400px]">
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
            {activeTeachers.length > 0 ? (
              activeTeachers.map((teacher, index) => (
                <tr key={teacher._id}>
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
      <div className="mt-4 p-4 bg-gray-100 rounded-lg flex items-center justify-between">
        <button className="opacity-50 cursor-not-allowed">
          <h1 className="text-black"> ◀︎ </h1>
        </button>
        <span className="text-gray-600">
          {activeTeachers.length > 0
            ? `1–${activeTeachers.length} de ${activeTeachers.length}`
            : "0 de 0"}
        </span>
        <button className="opacity-50 cursor-not-allowed">
          <h1 className="text-black"> ▶︎ </h1>
        </button>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={activeTeachers} />
        </div>
      </div>
    </div>
  );
}
