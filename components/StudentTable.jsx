import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Filters from "./StudentFilters";
import ExportButtons from "./StudentExportButtons";
import StudentAttendanceList from "./StudentAttendanceList";
import { getCurrentUser } from "../api/user";
import { getStudentsByCampusId } from "../api/student";
import calculateAge from "./calculateAge";

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
    minAge: "",
    maxAge: "",
  });

  const router = useRouter();

  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        const campusId = user?.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        const studentData = await getStudentsByCampusId(campusId);

        if (studentData && studentData.length === 0) {
          setError("No se encontraron estudiantes para este campus.");
        } else if (studentData) {
          const activeStudents = studentData.filter(
            (student) => student.status === "activo"
          );

          const sortedStudents = activeStudents.sort((a, b) => {
            const classComparison = a.ClassId?.name.localeCompare(
              b.ClassId?.name
            );
            if (classComparison !== 0) return classComparison;
            return a.lastName.localeCompare(b.lastName);
          });

          setStudents(sortedStudents);
          setFilteredStudents(sortedStudents);
        } else {
          setError("Hubo un problema al cargar los estudiantes.");
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
      const age = calculateAge(student.birthDate);
      const minAgeMatch = filters.minAge
        ? age >= parseInt(filters.minAge)
        : true;
      const maxAgeMatch = filters.maxAge
        ? age <= parseInt(filters.maxAge)
        : true;

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

      return (
        nameMatch &&
        classMatch &&
        genderMatch &&
        instrumentMatch &&
        minAgeMatch &&
        maxAgeMatch
      );
    });

    setFilteredStudents(filtered);
  }, [filters, students]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p className="text-center text-black">Cargando...</p>;

  return (
    <div className="mt-6">
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <div className="overflow-y-auto h-[47vh]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Apellidos</th>
              <th className="p-3 border-b text-black">Edad</th>
              <th className="p-3 border-b text-black">Clase</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr
                  key={`${student._id}-${index}`}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    router.push(`/formularioDeAlumnos?id=${student._id}`)
                  }
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{student.firstName}</td>
                  <td className="p-3 border-b">{student.lastName}</td>
                  <td className="p-3 border-b">
                    {calculateAge(student.birthDate)}
                  </td>
                  <td className="p-3 border-b">
                    {student.ClassId?.name || "Sin clase"}
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
          <ExportButtons data={filteredStudents} />
        </div>
      </div>
      <div>
        <div className="w-full">
          <StudentAttendanceList data={filteredStudents} />
        </div>
      </div>
    </div>
  );
}
