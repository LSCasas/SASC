import React from "react";
import Sidebar from "@/components/Sidebar";
import TransferTable from "@/components/TransferTable";

export default function TransferPage() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 text-[#6C0036]">
            Transferencias de Alumnos
          </h1>
          <div className="overflow-x-auto">
            <TransferTable />
          </div>
        </div>
      </div>
    </div>
  );
}
