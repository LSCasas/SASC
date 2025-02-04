import React from "react";
import Sidebar from "@/components/Sidebar";
import ParentTable from "@/components/ParentTable";
import { useRouter } from "next/router";

export default function ParentPage() {
  const router = useRouter();

  const handleCreateStudent = () => {
    router.push("/agregarTutor");
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 text-[#6C0036]">
            Gestión de Tutores
          </h1>

          <div className="mb-4 text-right">
            <button
              onClick={handleCreateStudent}
              className="w-full sm:w-auto py-2 px-4 bg-gradient-to-r bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
            >
              Agregar Tutor
            </button>
          </div>

          <div className="overflow-x-auto">
            <ParentTable />
          </div>
        </div>
      </div>
    </div>
  );
}
