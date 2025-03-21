import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { selectCampus } from "@/api/auth";

export default function CampusCard() {
  const [campuses, setCampuses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCampuses = JSON.parse(localStorage.getItem("campuses")) || [];
    const activeCampuses = storedCampuses.filter(
      (campus) => campus.isAchive === false
    );
    setCampuses(activeCampuses);
  }, []);

  const handleSelectCampus = async (campusId) => {
    try {
      const response = await selectCampus(campusId);

      localStorage.removeItem("campuses");

      router.push("/alumnos");
    } catch (error) {
      console.error("Error al seleccionar sede:", error);
    }
  };

  return (
    <div className="mt-6">
      <div className="overflow-y-auto h-[80vh]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {campuses.map((campus) => (
            <div
              key={campus._id}
              className="cursor-pointer p-6 text-center bg-white shadow-lg rounded-2xl hover:shadow-xl transition border border-gray-200"
              onClick={() => handleSelectCampus(campus._id)}
            >
              <h2 className="text-lg font-semibold text-gray-700">
                {campus.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
