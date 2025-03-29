import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function ExportButtons({ data }) {
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

    doc.text("Reporte de Campus", marginLeft, 10);

    doc.autoTable({
      startY: 20,
      head: [["#", "Nombre", "Dirección", "Teléfono"]],
      body: data.map((campus, index) => [
        index + 1,
        campus.name || "Sin nombre",
        campus.address || "Sin dirección",
        campus.contactPhone || "Sin teléfono",
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

    doc.save("Reporte_de_Campus.pdf");
  };

  const exportToExcel = () => {
    if (!Array.isArray(data)) return;

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((campus, index) => ({
        "#": index + 1,
        Nombre: campus.name || "Sin nombre",
        Dirección: campus.address || "Sin dirección",
        Teléfono: campus.contactPhone || "Sin teléfono",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Campus");

    XLSX.writeFile(workbook, "Campus.xlsx");
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
