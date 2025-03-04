import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { getAllStudents } from "@/api/student";
import { getAllTeachers } from "@/api/teacher";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentsAndTeachers = async () => {
      const studentsData = await getAllStudents();
      if (studentsData) {
        setStudents(studentsData);
      }

      const teachersData = await getAllTeachers();
      if (teachersData) {
        setTeachers(teachersData);
      }

      setLoading(false);
    };

    fetchStudentsAndTeachers();
  }, []);

  const totalStudents = students.length;
  const activeStudents = students.filter(
    (student) => student.status === "activo"
  ).length;

  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(
    (teacher) => teacher.isAchive === false
  ).length;

  const cardsData = [
    {
      title: "Estudiantes",
      count: loading
        ? "Cargando..."
        : `${totalStudents} (Activos: ${activeStudents})`,
      description: "Total estudiantes",
      gradient: "bg-gradient-to-r from-[#FF4D6D] to-[#FF6B8D]",
    },
    {
      title: "Profesores",
      count: loading
        ? "Cargando..."
        : `${totalTeachers} (Activos: ${activeTeachers})`, // Mostrar número de profesores y activos
      description: "Total profesores",
      gradient: "bg-gradient-to-r from-[#4D9EFF] to-[#6BBFFF]",
    },
    {
      title: "Padres",
      count: 2,
      description: "Total padres",
      gradient: "bg-gradient-to-r from-[#4DFF88] to-[#6BFFAA]",
    },
    {
      title: "Bibliotecario",
      count: 2,
      description: "Total bibliotecarios",
      gradient: "bg-gradient-to-r from-[#FFAC4D] to-[#FFC26B]",
    },
    {
      title: "Asistencia",
      count: 0,
      description: "Total estudiantes presentes hoy",
      gradient: "bg-gradient-to-r from-[#9B4DFF] to-[#B96BFF]",
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
