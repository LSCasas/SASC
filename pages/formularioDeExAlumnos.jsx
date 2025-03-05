import React from "react";
import Sidebar from "@/components/Sidebar";
import FormerStudentForm from "@/components/FormerStudentForm";

export default function FormerStudentFormPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-6">
          <h1 className="md:text-2xl text-xl font-bold text-center mb-6 text-[#6C0036]">
            Información de Ex Alumno
          </h1>
          <FormerStudentForm />
        </div>
      </div>
    </div>
  );
}
