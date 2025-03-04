import React from "react";
import SidebarAdmin from "@/components/SidebarAdmin";
import CoordinatorForm from "@/components/CoordinatorForm";

export default function CoordinatorFormPage() {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-6">
          <h1 className="md:text-2xl text-xl font-bold text-center mb-6 text-[#6C0036]">
            Información del Coordinador
          </h1>
          <CoordinatorForm />
        </div>
      </div>
    </div>
  );
}
