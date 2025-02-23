import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { getUserById } from "../api/user";

export default function ExportButtons({ data, allTeachers }) {
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
    if (!Array.isArray(allTeachers)) return;

    const doc = new jsPDF("p", "mm", "a4");
    const marginLeft = 5;
    const tableWidth = doc.internal.pageSize.getWidth() - marginLeft - 5;

    const chunkSize = 20;
    let firstPage = true;

    for (let i = 0; i < allTeachers.length; i += chunkSize) {
      const chunk = allTeachers.slice(i, i + chunkSize);

      if (i > 0) doc.addPage();

      if (firstPage) {
        doc.text(`Reporte de Docentes - ${campusName}`, marginLeft, 10);
        firstPage = false;
      }

      doc.autoTable({
        startY: 20,
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

    doc.save(`Reporte_de_Docentes_${campusName}.pdf`);
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
