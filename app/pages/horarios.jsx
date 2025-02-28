import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ClassSchedule from "@/components/ClassSchedule";
import ClassScheduleExportButtons from "@/components/ClassScheduleExportButtons";
import { getClassesByCampusId } from "@/api/class";
import { getUserById } from "@/api/user";

export default function SchedulePage() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const user = await getUserById();
        const campusId = user?.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let classData = await getClassesByCampusId(campusId);
        classData = classData
          .filter((c) => c.isAchive === false)
          .sort((a, b) => a.name.localeCompare(b.name));

        setClasses(classData);
      } catch (err) {
        console.error("Error al obtener las clases:", err);
      }
    }
    fetchClasses();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 text-[#6C0036]">
            Horarios de Clases
          </h1>
          <div className="overflow-x-auto">
            <ClassSchedule />
          </div>
          <ClassScheduleExportButtons data={classes} />
        </div>
      </div>
    </div>
  );
}
