import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function CoordinatorExportButtons({ data }) {
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

    doc.text("Reporte de Coordinadores", marginLeft, 10);

    doc.autoTable({
      startY: 20,
      head: [["#", "Nombre", "Apellido", "Teléfono", "Campus", "Tipo"]],
      body: data.map((coordinator, index) => [
        index + 1,
        coordinator.firstName || "Sin nombre",
        coordinator.lastName || "Sin apellido",
        coordinator.phone || "Sin teléfono",
        coordinator.role === "admin"
          ? "Con acceso a todas las sedes"
          : coordinator.campusId
              .filter((campus) => !campus.isAchive)
              .map((campus) => campus.name)
              .join(", ") || "Sin campus",
        coordinator.role === "admin" ? "Admin" : "Coordinador",
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

    doc.save("Reporte_de_Coordinadores.pdf");
  };

  const exportToExcel = () => {
    if (!Array.isArray(data)) return;

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((coordinator, index) => ({
        "#": index + 1,
        Nombre: coordinator.firstName || "Sin nombre",
        Apellido: coordinator.lastName || "Sin apellido",
        Teléfono: coordinator.phone || "Sin teléfono",
        Campus:
          coordinator.role === "admin"
            ? "Con acceso a todas las sedes"
            : coordinator.campusId
                .filter((campus) => !campus.isAchive)
                .map((campus) => campus.name)
                .join(", ") || "Sin campus",
        Tipo: coordinator.role === "admin" ? "Admin" : "Coordinador",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Coordinadores");

    XLSX.writeFile(workbook, "Coordinadores.xlsx");
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
