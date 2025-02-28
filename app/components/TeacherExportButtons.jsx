import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { getUserById } from "../api/user";

export default function TeacherExportButtons({ data }) {
  const [campusName, setCampusName] = useState("Desconocido");

  useEffect(() => {
    async function fetchCampusName() {
      try {
        const user = await getUserById();
        const campus = user.campusId.find(
          (c) => c._id === user.selectedCampusId
        );
        if (campus) {
          setCampusName(campus.name);
        }
      } catch (error) {
        console.error("Error al obtener el nombre del campus:", error);
      }
    }

    fetchCampusName();
  }, []);

  const exportToPDF = () => {
    if (!Array.isArray(data) || data.length === 0) return;

    const doc = new jsPDF("p", "mm", "a4");
    doc.text(`Reporte de Docentes - ${campusName}`, 10, 10);

    doc.autoTable({
      startY: 20,
      head: [["#", "Nombre", "Apellidos", "Teléfono", "Correo"]],
      body: data.map((teacher, index) => [
        index + 1,
        teacher.firstName || "Sin nombre",
        teacher.lastName || "Sin apellidos",
        teacher.phone || "Sin teléfono",
        teacher.email || "Sin correo",
      ]),
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [176, 0, 94], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });

    doc.save(`Reporte_de_Docentes_${campusName}.pdf`);
  };

  const exportToExcel = () => {
    if (!Array.isArray(data) || data.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((teacher, index) => ({
        "#": index + 1,
        Nombre: teacher.firstName || "Sin nombre",
        Apellidos: teacher.lastName || "Sin apellidos",
        Teléfono: teacher.phone || "Sin teléfono",
        Correo: teacher.email || "Sin correo",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Docentes - ${campusName}`
    );
    XLSX.writeFile(workbook, `Docentes_${campusName}.xlsx`);
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={exportToPDF}
        className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Exportar a PDF
      </button>
      <button
        onClick={exportToExcel}
        className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Exportar a Excel
      </button>
    </div>
  );
}
