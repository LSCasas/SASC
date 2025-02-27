import React, { useEffect, useState } from "react";
import Filters from "./StudentFilters";
import ExportButtons from "./StudentExportButtons";
import Link from "next/link";
import { getUserById } from "../api/user";
import { getStudentsByCampusId } from "../api/student";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    className: "",
    gender: "",
    hasInstrument: "",
    generation: "",
  });

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
          const activeStudents = studentData.filter(
            (student) => student.status === "activo"
          );

          const sortedStudents = activeStudents.sort((a, b) =>
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

  useEffect(() => {
    let filtered = students.filter((student) => {
      const nameMatch =
        student.firstName.toLowerCase().includes(filters.name.toLowerCase()) ||
        student.lastName.toLowerCase().includes(filters.name.toLowerCase());

      const classMatch =
        student.ClassId?.name
          ?.toLowerCase()
          .includes(filters.className.toLowerCase()) ||
        filters.className === "";

      const genderMatch = filters.gender
        ? student.gender === filters.gender
        : true;

      const instrumentMatch =
        filters.hasInstrument === ""
          ? true
          : student.hasInstrument.toString() === filters.hasInstrument;

      if (filters.generation) {
        let matchingStudents = [];

        if (
          student.ClassId?.generation
            ?.toLowerCase()
            .includes(filters.generation.toLowerCase())
        ) {
          matchingStudents.push({
            ...student,
            matchedGeneration: student.ClassId?.generation,
          });
        }

        student.previousClasses?.forEach((prevClass) => {
          if (
            prevClass.generation
              ?.toLowerCase()
              .includes(filters.generation.toLowerCase())
          ) {
            matchingStudents.push({
              ...student,
              matchedGeneration: prevClass.generation,
            });
          }
        });

        return matchingStudents.length > 0 ? matchingStudents : false;
      }

      return nameMatch && classMatch && genderMatch && instrumentMatch;
    });

    filtered = filtered.flat();

    setFilteredStudents(filtered);
  }, [filters, students]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p className="text-center text-black">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="mt-6">
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <div className="overflow-y-auto h-[50vh]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Apellidos</th>
              <th className="p-3 border-b text-black">Clase</th>
              {/* <th className="p-3 border-b text-black">Generación</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr
                  key={`${student._id}-${index}`}
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
                  {/* <td className="p-3 border-b">
                    <Link href={`/formularioDeAlumnos?id=${student._id}`}>
                      {student.matchedGeneration ||
                        student.ClassId?.generation ||
                        "Sin generación"}
                    </Link>
                  </td> */}
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
          <ExportButtons data={filteredStudents} />
        </div>
      </div>
    </div>
  );
}
