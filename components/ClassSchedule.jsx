import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../api/user";
import { getClassesByCampusId } from "../api/class";

const days = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

export default function ClassSchedule() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClasses() {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        const campusId = user?.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let classData = await getClassesByCampusId(campusId);
        classData = classData
          .filter((c) => c.isAchive === false)
          .sort((a, b) => a.name.localeCompare(b.name));

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

  return (
    <div className="overflow-y-auto h-[70vh]">
      <div className="mb-4">
        <table className="w-full border-collapse border border-gray-300 text-black">
          <thead>
            <tr className="bg-[#B0005E] text-white">
              <th className="border border-gray-300 px-4 py-4">Clase</th>
              <th className="border border-gray-300 px-4 py-4">Instructor</th>
              {days.map((day, index) => (
                <th key={index} className="border border-gray-300 px-4 py-4">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classes.map((classData, index) => (
              <tr key={index} className="bg-white hover:bg-gray-200">
                <td className="border border-gray-300 px-4 py-4">
                  {classData.name}
                </td>
                <td className="border border-gray-300 px-4 py-4">
                  {classData.teacherId
                    ? `${classData.teacherId.firstName} ${classData.teacherId.lastName}`
                    : "Sin asignar"}
                </td>
                {days.map((day, i) => (
                  <td
                    key={i}
                    className="border border-gray-300 px-4 py-4 text-center"
                  >
                    {classData.days.includes(day)
                      ? `${classData.startTime} - ${classData.endTime}`
                      : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
