import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { getCurrentUser } from "../api/user";

export default function StudentExportButtons({ data }) {
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

    const chunkSize = 20;
    let firstPage = true;

    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);

      if (i > 0) doc.addPage();

      if (firstPage) {
        doc.text(`Reporte de Estudiantes - ${campusName}`, marginLeft, 10);
        firstPage = false;
      }

      doc.autoTable({
        startY: 20,
        head: [["#", "Nombre", "Apellidos", "Clase"]],
        body: chunk.map((student, index) => [
          i + index + 1,
          student.firstName || "Sin nombre",
          student.lastName || "Sin apellido",
          student.ClassId?.name || "Sin clase",
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
    }

    doc.save(`Reporte_de_Estudiantes_${campusName}.pdf`);
  };

  const exportToExcel = () => {
    if (!Array.isArray(data)) return;

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((student, index) => ({
        "#": index + 1,
        Nombre: student.firstName || "Sin nombre",
        Apellidos: student.lastName || "Sin apellido",
        Clase: student.ClassId?.name || "Sin clase",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Estudiantes - ${campusName}`
    );

    XLSX.writeFile(workbook, `Estudiantes_${campusName}.xlsx`);
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={() => handleExport("PDF")}
        className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Exportar a PDF
      </button>
      <button
        onClick={() => handleExport("Excel")}
        className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Exportar a Excel
      </button>
    </div>
  );
}
