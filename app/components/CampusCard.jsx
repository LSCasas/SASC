import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { selectCampus } from "@/api/api";

export default function CampusCard() {
  const [campuses, setCampuses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCampuses = JSON.parse(localStorage.getItem("campuses")) || [];
    setCampuses(storedCampuses);
  }, []);

  const handleSelectCampus = async (campusId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await selectCampus(token, campusId);

      localStorage.removeItem("campuses");

      localStorage.setItem("token", response.token);

      router.push("/alumnos");
    } catch (error) {
      console.error("Error al seleccionar sede:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
      {campuses.map((campus) => (
        <div
          key={campus._id}
          className="cursor-pointer p-6 text-center bg-white shadow-lg rounded-2xl hover:shadow-xl transition border border-gray-200"
          onClick={() => handleSelectCampus(campus._id)}
        >
          <h2 className="text-lg font-semibold text-gray-700">{campus.name}</h2>
        </div>
      ))}
    </div>
  );
}
