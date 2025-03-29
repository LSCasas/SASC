import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { getCurrentUser } from "../api/user";

export default function FormerStudentExportButtons({ data }) {
  const [campusName, setCampusName] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getCurrentUser();
        const userCampusId = user.selectedCampusId;
        const campus = user.campusId.find(
          (campus) => campus._id === userCampusId
        );
        if (campus) {
          setCampusName(campus.name);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    }
    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleExport = (type) => {
    if (type === "PDF") {
      exportToPDF();
    } else if (type === "Excel") {
      exportToExcel();
    }
  };

  const exportToPDF = () => {
    if (!Array.isArray(data)) return;

    const doc = new jsPDF("p", "mm", "a4");
    const marginLeft = 5;
    const tableWidth = doc.internal.pageSize.getWidth() - marginLeft - 5;

    doc.text(`Reporte de Exalumnos - ${campusName}`, marginLeft, 10);

    doc.autoTable({
      startY: 20,
      head: [
        [
          "#",
          "Nombre",
          "Apellido",
          "Última Clase",
          "Estado",
          "Fecha de Abandono",
        ],
      ],
      body: data.map((student, index) => [
        index + 1,
        student.firstName || "Sin nombre",
        student.lastName || "Sin apellido",
        student.ClassId?.name || "Sin clase",
        student.status || "Desconocido",
        student.updatedAt ? formatDate(student.updatedAt) : "No disponible",
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [176, 0, 94],
        textColor: [255, 255, 255],
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      margin: { left: marginLeft },
      tableWidth: tableWidth,
      theme: "grid",
    });

    doc.save(`Reporte_de_Exalumnos_${campusName}.pdf`);
  };

  const exportToExcel = () => {
    if (!Array.isArray(data)) return;

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((student, index) => ({
        "#": index + 1,
        Nombre: student.firstName || "Sin nombre",
        Apellido: student.lastName || "Sin apellido",
        "Última Clase": student.ClassId?.name || "Sin clase",
        Estado: student.status || "Desconocido",
        "Fecha de Abandono": student.updatedAt
          ? formatDate(student.updatedAt)
          : "No disponible",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Exalumnos - ${campusName}`
    );

    XLSX.writeFile(workbook, `Exalumnos_${campusName}.xlsx`);
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={() => handleExport("PDF")}
        className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Reporte. PDF
      </button>
      <button
        onClick={() => handleExport("Excel")}
        className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Reporte. EXEL
      </button>
    </div>
  );
}
