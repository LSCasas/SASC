import React, { useState, useEffect } from "react";
import SidebarAdmin from "@/components/SidebarAdmin";
import { getAllStudents } from "@/api/student";
import { getAllTeachers } from "@/api/teacher";
import { getAllTutors } from "@/api/tutor";
import { getAllInstruments } from "@/api/instrument";
import { getAllUsers } from "@/api/user";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import moment from "moment";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      const studentsData = (await getAllStudents()) || [];
      setStudents(studentsData);
      setTeachers((await getAllTeachers()) || []);
      setTutors((await getAllTutors()) || []);
      setInstruments((await getAllInstruments()) || []);
      const usersData = (await getAllUsers()) || [];
      setCoordinators(usersData.filter((user) => user.role === "coordinator"));
      setLoading(false);
    };
    fetchAllData();
  }, []);

  const data = [
    {
      name: "Estudiantes",
      total: students.length,
      activos: students.filter((s) => s.status === "activo").length,
    },
    {
      name: "Profesores",
      total: teachers.length,
      activos: teachers.filter((t) => !t.isAchive).length,
    },
    {
      name: "Tutores",
      total: tutors.length,
      activos: tutors.filter((t) => !t.isArchive).length,
    },
    {
      name: "Instrumentos",
      total: instruments.length,
      activos: instruments.filter((i) => !i.isAchive).length,
    },
    {
      name: "Coordinadores",
      total: coordinators.length,
      activos: coordinators.filter((c) => !c.isArchived).length,
    },
  ];

  const campusDistribution = students.reduce((acc, student) => {
    const campusName = student.campusId?.name || "Desconocido";
    acc[campusName] = (acc[campusName] || 0) + 1;
    return acc;
  }, {});

  const campusData = Object.keys(campusDistribution).map((campus) => ({
    name: campus,
    students: campusDistribution[campus],
  }));

  const studentRegistrations = students.reduce((acc, student) => {
    if (student.createdAt) {
      const month = moment(student.createdAt).format("YYYY-MM");
      const campusName = student.campusId?.name || "Desconocido";
      if (!acc[month]) acc[month] = {};
      acc[month][campusName] = (acc[month][campusName] || 0) + 1;
    }
    return acc;
  }, {});

  const registrationData = Object.keys(studentRegistrations).map((month) => {
    return {
      month,
      ...studentRegistrations[month],
    };
  });

  const COLORS = ["#FF4D6D", "#4D9EFF", "#FFB84D", "#8A2BE2", "#00B894"];

  return (
    <div className="flex flex-col lg:flex-row">
      <SidebarAdmin />
      <div className="flex-1 bg-gray-50 min-h-screen p-6 overflow-y-auto md:h-[50vh]">
        <div className="bg-white p-6 rounded-xl shadow-md ">
          <h2 className="text-xl font-bold mb-4">Resumen Estadístico</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Total" />
              <Bar dataKey="activos" fill="#82ca9d" name="Activos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4">
            Distribución de Estudiantes por Sede
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campusData}
                dataKey="students"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {campusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
