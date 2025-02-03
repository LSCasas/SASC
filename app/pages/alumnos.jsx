import React from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import StudentTable from "@/components/StudentTable";

export default function AlumnoPage() {
  const router = useRouter();

  const handleCreateStudent = () => {
    router.push("/crearAlumno");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#6C0036]">
            Gestión de Alumnos
          </h1>

          <div className="mb-4 text-right">
            <button
              onClick={handleCreateStudent}
              className="w-auto py-2 px-4 bg-gradient-to-r bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
            >
              Agregar Alumno
            </button>
          </div>

          <StudentTable />
        </div>
      </div>
    </div>
  );
}
