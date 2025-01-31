import React from "react";
import Sidebar from "@/components/Sidebar";

export default function SchedulePage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-6"></div>
      </div>
    </div>
  );
}
