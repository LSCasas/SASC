import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function ExportButtons({ data, allTeachers }) {
  const handleExport = (type) => {
    if (type === "PDF") {
      exportToPDF();
    } else if (type === "Excel") {
      exportToExcel();
    }
  };

  const exportToPDF = () => {
    if (!Array.isArray(allTeachers)) return;

    const doc = new jsPDF("p", "mm", "a4");
    const marginLeft = 5;
    const tableWidth = doc.internal.pageSize.getWidth() - marginLeft - 5;

    const chunkSize = 20;
    for (let i = 0; i < allTeachers.length; i += chunkSize) {
      const chunk = allTeachers.slice(i, i + chunkSize);

      if (i > 0) doc.addPage();

      doc.autoTable({
        startY: 10,
        head: [["#", "Nombre", "Apellidos", "Teléfono", "Correo"]],
        body: chunk.map((teacher, index) => [
          i + index + 1,
          teacher.firstName || "Sin nombre",
          teacher.lastName || "Sin apellidos",
          teacher.phone || "Sin teléfono",
          teacher.email || "Sin correo",
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

    doc.save("docentes.pdf");
  };

  const exportToExcel = () => {
    if (!Array.isArray(allTeachers)) return;

    const worksheet = XLSX.utils.json_to_sheet(
      allTeachers.map((teacher, index) => ({
        "#": index + 1,
        Nombre: teacher.firstName || "Sin nombre",
        Apellidos: teacher.lastName || "Sin apellidos",
        Teléfono: teacher.phone || "Sin teléfono",
        Correo: teacher.email || "Sin correo",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Docentes");

    XLSX.writeFile(workbook, "docentes.xlsx");
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
