import React, { useEffect, useState } from "react";
import FormerStudentFilters from "./FormerStudentFilters";
import ExportButtons from "./FormerStudentExportButtons";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCurrentUser } from "../api/user";
import { getStudentsByCampusId } from "../api/student";

export default function ExStudentTable() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [instrumentStatus, setInstrumentStatus] = useState("");
  const [studentStatus, setStudentStatus] = useState("");

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

        if (studentData.length === 0) {
          setError("No se encontraron estudiantes para este campus.");
        } else {
          const formerStudents = studentData.filter(
            (student) => student.status !== "activo"
          );

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

  useEffect(() => {
    let filtered = students;

    if (searchName) {
      filtered = filtered.filter(
        (student) =>
          student.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
          student.lastName.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchClass) {
      filtered = filtered.filter((student) =>
        student.ClassId?.name?.toLowerCase().includes(searchClass.toLowerCase())
      );
    }

    if (selectedGender) {
      filtered = filtered.filter(
        (student) => student.gender === selectedGender
      );
    }

    if (instrumentStatus) {
      filtered = filtered.filter((student) =>
        instrumentStatus === "Devuelto"
          ? student.hasInstrument === false
          : student.hasInstrument === true
      );
    }

    if (studentStatus) {
      filtered = filtered.filter((student) => student.status === studentStatus);
    }

    setFilteredStudents(filtered);
  }, [
    searchName,
    searchClass,
    selectedGender,
    instrumentStatus,
    studentStatus,
    students,
  ]);

  const handleRowClick = (studentId) => {
    router.push(`/formularioDeAlumnos?id=${studentId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  if (loading) return <p className="text-center text-black">Cargando...</p>;

  return (
    <div className="mt-6">
      <FormerStudentFilters
        setSearchName={setSearchName}
        setSearchClass={setSearchClass}
        setSelectedGender={setSelectedGender}
        setInstrumentStatus={setInstrumentStatus}
        setStudentStatus={setStudentStatus}
      />
      <div className="overflow-y-auto h-[50vh]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Apellido</th>
              <th className="p-3 border-b text-black">Última Clase Tomada</th>
              <th className="p-3 border-b text-black">Estado</th>
              <th className="p-3 border-b text-black">
                Fecha de Abandono
              </th>{" "}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr
                  key={student._id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(student._id)}
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{student.firstName}</td>
                  <td className="p-3 border-b">{student.lastName}</td>
                  <td className="p-3 border-b">
                    {student.ClassId?.name || "Sin clase"}
                  </td>
                  <td className="p-3 border-b">{student.status}</td>
                  <td className="p-3 border-b">
                    {formatDate(student.updatedAt)}
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
          <ExportButtons data={filteredStudents} />
        </div>
      </div>
    </div>
  );
}
