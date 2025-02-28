import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { getCurrentUser } from "../api/user";

export default function TutorExportButtons({ data, allTutors }) {
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
    if (!Array.isArray(allTutors)) return;

    const doc = new jsPDF("p", "mm", "a4");
    const marginLeft = 5;
    const tableWidth = doc.internal.pageSize.getWidth() - marginLeft - 5;

    const chunkSize = 20;
    let firstPage = true;

    for (let i = 0; i < allTutors.length; i += chunkSize) {
      const chunk = allTutors.slice(i, i + chunkSize);

      if (i > 0) doc.addPage();

      if (firstPage) {
        doc.text(`Reporte de Tutores - ${campusName}`, marginLeft, 10);
        firstPage = false;
      }

      doc.autoTable({
        startY: 20,
        head: [
          ["#", "Nombre", "Apellido", "Estudiantes", "Clase(s)", "Contacto"],
        ],
        body: chunk.map((tutor, index) => {
          const childrenNames = tutor.children
            .map((child) => child.firstName + " " + child.lastName)
            .join(", ");
          const childrenClasses = tutor.children
            .map((child) => child.ClassId.name)
            .join(", ");

          return [
            i + index + 1,
            tutor.name || "Sin nombre",
            tutor.lastname || "Sin apellido",
            childrenNames || "No disponible",
            childrenClasses || "No disponible",
            tutor.phone || "No disponible",
          ];
        }),
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

    doc.save(`Reporte_de_Tutores_${campusName}.pdf`);
  };

  const exportToExcel = () => {
    if (!Array.isArray(allTutors)) return;

    const worksheet = XLSX.utils.json_to_sheet(
      allTutors.map((tutor, index) => ({
        "#": index + 1,
        Nombre: tutor.name || "Sin nombre",
        Apellido: tutor.lastname || "Sin apellido",
        Estudiantes:
          tutor.children
            .map((child) => child.firstName + " " + child.lastName)
            .join(", ") || "No disponible",
        "Clase(s)":
          tutor.children.map((child) => child.ClassId.name).join(", ") ||
          "No disponible",
        Contacto: tutor.phone || "No disponible",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Tutores - ${campusName}`
    );

    XLSX.writeFile(workbook, `Tutores_${campusName}.xlsx`);
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
