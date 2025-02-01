import React from "react";
import Sidebar from "@/components/Sidebar";
import StudentInfoCard from "@/components/StudentInfoCard";

export default function AlumnoPage() {
  const studentData = {
    nombre_tutor: "Juan Pérez",
    telefono_tutor: "555-123-4567",
    curp: "JUAP890101HDFRRL09",
    sede_cultural: "Sede Cultural de Tultepec",
    inscrito_desde: "01/02/2023",
    curso: "Violín Intermedio",
    instrumento: "Violín",
    cursos_anteriores: ["Violín Básico", "Solfeo"],
    orquesta_sinfonica: "Sí",
    condiciones_medicas: "Ninguna",
    necesidades_especiales: "Ninguna",
    documentos_requeridos: "Acta de nacimiento, CURP",
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#6C0036]">
            Información del Estudiante
          </h1>
          <StudentInfoCard student={studentData} />
        </div>
      </div>
    </div>
  );
}
