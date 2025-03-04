import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { getAllStudents } from "@/api/student";
import { getAllTeachers } from "@/api/teacher";
import { getAllTutors } from "@/api/tutor"; // Asegúrate de importar la función

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [tutors, setTutors] = useState([]); // Nuevo estado para tutores
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      const studentsData = await getAllStudents();
      if (studentsData) {
        setStudents(studentsData);
      }

      const teachersData = await getAllTeachers();
      if (teachersData) {
        setTeachers(teachersData);
      }

      const tutorsData = await getAllTutors(); // Llamamos a la función para obtener los tutores
      if (tutorsData) {
        setTutors(tutorsData);
      }

      setLoading(false);
    };

    fetchAllData();
  }, []);

  // Estudiantes
  const totalStudents = students.length;
  const activeStudents = students.filter(
    (student) => student.status === "activo"
  ).length;

  // Profesores
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(
    (teacher) => teacher.isAchive === false
  ).length;

  // Tutores
  const totalTutors = tutors.length;
  const activeTutors = tutors.filter(
    (tutor) => tutor.isArchive === false
  ).length;

  const cardsData = [
    {
      title: "Estudiantes",
      count: loading
        ? "Cargando..."
        : `${totalStudents} (Activos: ${activeStudents})`,
      description: "Total de estudiantes",
      gradient: "bg-gradient-to-r from-[#FF4D6D] to-[#FF6B8D]",
    },
    {
      title: "Profesores",
      count: loading
        ? "Cargando..."
        : `${totalTeachers} (Activos: ${activeTeachers})`,
      description: "Total profesores",
      gradient: "bg-gradient-to-r from-[#4D9EFF] to-[#6BBFFF]",
    },
    {
      title: "Tutores",
      count: loading
        ? "Cargando..."
        : `${totalTutors} (Activos: ${activeTutors})`, // Mostrar número de tutores y activos
      description: "Total tutores",
      gradient: "bg-gradient-to-r from-[#FFB84D] to-[#FFDB6B]",
    },
    {
      title: "Padres",
      count: 2,
      description: "Total padres",
      gradient: "bg-gradient-to-r from-[#4DFF88] to-[#6BFFAA]",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsData.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              count={card.count}
              description={card.description}
              gradient={card.gradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
