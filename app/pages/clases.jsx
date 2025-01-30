import React from "react";
import Sidebar from "@/components/Sidebar";
import InstrumentCard from "@/components/InstrumentCard";

export default function ParentPage() {
  const musicClassesData = [
    {
      title: "Violín",
      instructor: "Carlos Martínez",
      gradient: "bg-gradient-to-r from-[#FF7F50] to-[#FFB74D]",
    },
    {
      title: "Viola",
      instructor: "Lucía Sánchez",
      gradient: "bg-gradient-to-r from-[#8E24AA] to-[#D81B60]",
    },
    {
      title: "Flauta",
      instructor: "José García",
      gradient: "bg-gradient-to-r from-[#1E88E5] to-[#42A5F5]",
    },
    {
      title: "Contrabajo",
      instructor: "Raúl Fernández",
      gradient: "bg-gradient-to-r from-[#43A047] to-[#66BB6A]",
    },
    {
      title: "Tímpano",
      instructor: "Ana Pérez",
      gradient: "bg-gradient-to-r from-[#F57C00] to-[#FFB300]",
    },
    {
      title: "Clarinete",
      instructor: "Marta Rodríguez",
      gradient: "bg-gradient-to-r from-[#9C27B0] to-[#D500F9]",
    },
    {
      title: "Oboe",
      instructor: "Luis González",
      gradient: "bg-gradient-to-r from-[#3F51B5] to-[#5C6BC0]",
    },
    {
      title: "Trombón",
      instructor: "Eduardo García",
      gradient: "bg-gradient-to-r from-[#FFEB3B] to-[#FF9800]",
    },
    {
      title: "Tuba",
      instructor: "Victoria Fernández",
      gradient: "bg-gradient-to-r from-[#FF5722] to-[#FF7043]",
    },
    {
      title: "Arpa",
      instructor: "Carlos Pérez",
      gradient: "bg-gradient-to-r from-[#4CAF50] to-[#81C784]",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#6C0036]">
            Clases impartidas en la Sede Cultural
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicClassesData.map((classData, index) => (
              <InstrumentCard
                key={index}
                title={classData.title}
                instructor={classData.instructor}
                gradient={classData.gradient}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
