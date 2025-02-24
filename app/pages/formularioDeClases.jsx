import React from "react";
import Sidebar from "@/components/Sidebar";
import ClassForm from "@/components/ClassForm";

export default function ClassFormPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#6C0036]">
            Información del la Clase
          </h1>
          <ClassForm />
        </div>
      </div>
    </div>
  );
}
