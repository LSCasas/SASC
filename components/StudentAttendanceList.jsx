import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { getCurrentUser } from "../api/user";

const getCurrentWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const startOfWeek = new Date(today.setDate(diff));
  const endOfWeek = new Date(today.setDate(diff + 6));

  const formatDate = (date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
  };

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
    weekDates: Array.from({ length: 7 }, (_, i) => {
      return formatDate(
        new Date(startOfWeek.setDate(startOfWeek.getDate() + (i === 0 ? 0 : 1)))
      );
    }),
  };
};

export default function StudentAttendanceList({ data }) {
  const [campusName, setCampusName] = useState("");
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    const { weekDates } = getCurrentWeekDates();
    setWeekDates(weekDates);

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
    const chunkSize = 50;
    let firstPage = true;

    const classes = data.reduce((acc, student) => {
      const className = student.ClassId?.name || "Sin clase";
      if (!acc[className]) {
        acc[className] = [];
      }
      acc[className].push(student);
      return acc;
    }, {});

    for (const [className, students] of Object.entries(classes)) {
      let pageCount = Math.ceil(students.length / chunkSize);
      for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        const chunk = students.slice(
          pageIndex * chunkSize,
          (pageIndex + 1) * chunkSize
        );
        if (!firstPage) doc.addPage();
        firstPage = false;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        const width = doc.internal.pageSize.width;
        const text = `Lista de Asistencia - ${className}`;
        const textWidth = doc.getTextWidth(text);
        doc.text(text, (width - textWidth) / 2, 10);

        doc.autoTable({
          startY: 20,
          head: [["#", "Nombre", "Apellido", ...weekDates]],
          body: chunk.map((student, index) => [
            pageIndex * chunkSize + index + 1,
            student.firstName || "Sin nombre",
            student.lastName || "Sin apellido",
            ...weekDates.map(() => ({
              content: "",
              styles: { halign: "center", cellWidth: 10 },
            })),
          ]),
          styles: { fontSize: 9, cellPadding: 3 },
          headStyles: { fillColor: [176, 0, 94], textColor: [255, 255, 255] },
          bodyStyles: { fillColor: [245, 245, 245] },
          alternateRowStyles: { fillColor: [255, 255, 255] },
          margin: { left: marginLeft },
          tableWidth: tableWidth,
          theme: "grid",
        });
      }
    }
    doc.save(`Lista_de_Asistencia_${campusName}.pdf`);
  };

  const exportToExcel = () => {
    if (!Array.isArray(data)) return;

    // Ensure sheet name is no longer than 31 characters
    const sheetName = `Lista de Asistencia - ${campusName}`;
    const truncatedSheetName =
      sheetName.length > 31 ? sheetName.slice(0, 31) : sheetName;

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((student, index) => ({
        "#": index + 1,
        Nombre: student.firstName || "Sin nombre",
        Apellido: student.lastName || "Sin apellido",
        ...Object.fromEntries(weekDates.map((date) => [date, ""])),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, truncatedSheetName);
    XLSX.writeFile(workbook, `Lista_de_Asistencia_${campusName}.xlsx`);
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={() => handleExport("PDF")}
        className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Lista de Asistencia. PDF
      </button>
      <button
        onClick={() => handleExport("Excel")}
        className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Lista de Asistencia. EXEL
      </button>
    </div>
  );
}
