import React, { useState, useEffect } from "react";
import SidebarAdmin from "@/components/SidebarAdmin";
import DashboardCard from "@/components/DashboardCard";
import { getAllStudents } from "@/api/student";
import { getAllTeachers } from "@/api/teacher";
import { getAllTutors } from "@/api/tutor";
import { getAllInstruments } from "@/api/instrument";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [instruments, setInstruments] = useState([]);
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

      const tutorsData = await getAllTutors();
      if (tutorsData) {
        setTutors(tutorsData);
      }

      const instrumentsData = await getAllInstruments();
      if (instrumentsData) {
        setInstruments(instrumentsData);
      }

      setLoading(false);
    };

    fetchAllData();
  }, []);

  const totalStudents = students.length;
  const activeStudents = students.filter(
    (student) => student.status === "activo"
  ).length;

  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(
    (teacher) => teacher.isAchive === false
  ).length;

  const totalTutors = tutors.length;
  const activeTutors = tutors.filter(
    (tutor) => tutor.isArchive === false
  ).length;

  const totalInstruments = instruments.length;
  const activeInstruments = instruments.filter(
    (instrument) => instrument.isAchive === false
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
        : `${totalTutors} (Activos: ${activeTutors})`,
      description: "Total tutores",
      gradient: "bg-gradient-to-r from-[#FFB84D] to-[#FFDB6B]",
    },
    {
      title: "Instrumentos",
      count: loading
        ? "Cargando..."
        : `${totalInstruments} (Activos: ${activeInstruments})`,
      description: "Total instrumentos",
      gradient: "bg-gradient-to-r from-[#8A2BE2] to-[#7B68EE]",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <SidebarAdmin />
      <div className="flex-1 bg-gray-50 min-h-screen">
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
    </div>
  );
};

export default Dashboard;
