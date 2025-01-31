import React from "react";

const musicClassesData = [
  { title: "Violín", instructor: "Carlos Martínez" },
  { title: "Flauta", instructor: "José García" },
  { title: "Contrabajo", instructor: "Raúl Fernández" },
  { title: "Tímpano", instructor: "Ana Pérez" },
  { title: "Clarinete", instructor: "Marta Rodríguez" },
];

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const getRandomHour = () => `${Math.floor(Math.random() * 5) + 2}:00 PM`;

export default function ClassSchedule() {
  return (
    <div className="overflow-x-auto">
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
          {musicClassesData.map((classData, index) => (
            <tr key={index} className="bg-white hover:bg-gray-200">
              <td className="border border-gray-300 px-4 py-4">
                {classData.title}
              </td>
              <td className="border border-gray-300 px-4 py-4">
                {classData.instructor}
              </td>
              {days.map((_, i) => (
                <td
                  key={i}
                  className="border border-gray-300 px-4 py-4 text-center"
                >
                  {getRandomHour()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
