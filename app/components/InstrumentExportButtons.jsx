import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { getUserById } from "../api/user";

export default function InstrumentExportButtons({ data }) {
  const [campusName, setCampusName] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getUserById();
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
        doc.text(`Reporte de Instrumentos - ${campusName}`, marginLeft, 10);
        firstPage = false;
      }

      doc.autoTable({
        startY: 20,
        head: [
          ["#", "Instrumento", "Id Interno", "Estudiante", "Fecha Asignación"],
        ],
        body: chunk.map((instrument, index) => [
          i + index + 1,
          instrument.name || "Sin nombre",
          instrument.internalId || "Sin Id",
          instrument.studentId
            ? `${instrument.studentId.firstName} ${instrument.studentId.lastName}`
            : "Sin asignar",
          instrument.assignmentDate
            ? new Date(instrument.assignmentDate).toLocaleDateString()
            : "Sin asignar",
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

    doc.save(`Reporte_de_Instrumentos_${campusName}.pdf`);
  };

  const exportToExcel = () => {
    if (!Array.isArray(data)) return;

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((instrument, index) => ({
        "#": index + 1,
        Instrumento: instrument.name || "Sin nombre",
        IdInterno: instrument.internalId || "Sin Id",
        Estudiante: instrument.studentId
          ? `${instrument.studentId.firstName} ${instrument.studentId.lastName}`
          : "Sin asignar",
        FechaAsignacion: instrument.assignmentDate
          ? new Date(instrument.assignmentDate).toLocaleDateString()
          : "Sin asignar",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Instrumentos - ${campusName}`
    );

    XLSX.writeFile(workbook, `Instrumentos_${campusName}.xlsx`);
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
