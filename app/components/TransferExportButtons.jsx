import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { getCurrentUser } from "../api/user";

export default function TransferExportButtons({ data }) {
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

    doc.text(`Reporte de Transferencias - ${campusName}`, marginLeft, 10);

    doc.autoTable({
      startY: 20,
      head: [
        [
          "#",
          "Nombre",
          "Apellidos",
          "Clase de Origen",
          "Sede de Origen",
          "Clase de Recepción",
          "Sede de Recepción",
          "Fecha de Transferencia",
        ],
      ],
      body: data.map((transfer, index) => [
        index + 1,
        transfer.studentId?.firstName || "N/A",
        transfer.studentId?.lastName || "N/A",
        transfer.originClass?.name || "N/A",
        transfer.originLocationId?.name || "N/A",
        transfer.destinationClass?.name || "N/A",
        transfer.destinationLocationId?.name || "N/A",
        new Date(transfer.transferDate).toLocaleString() || "N/A",
      ]),
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [176, 0, 94], textColor: [255, 255, 255] },
      bodyStyles: { fillColor: [245, 245, 245] },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      margin: { left: marginLeft },
      tableWidth: tableWidth,
      theme: "grid",
    });

    doc.save(`Reporte_de_Transferencias_${campusName}.pdf`);
  };

  const exportToExcel = () => {
    if (!Array.isArray(data)) return;

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((transfer, index) => ({
        "#": index + 1,
        Nombre: transfer.studentId?.firstName || "N/A",
        Apellidos: transfer.studentId?.lastName || "N/A",
        "Clase de Origen": transfer.originClass?.name || "N/A",
        "Sede de Origen": transfer.originLocationId?.name || "N/A",
        "Clase de Recepción": transfer.destinationClass?.name || "N/A",
        "Sede de Recepción": transfer.destinationLocationId?.name || "N/A",
        "Fecha de Transferencia":
          new Date(transfer.transferDate).toLocaleString() || "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Transferencias - ${campusName}`
    );
    XLSX.writeFile(workbook, `Transferencias_${campusName}.xlsx`);
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
