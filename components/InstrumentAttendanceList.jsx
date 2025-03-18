import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { getCurrentUser } from "../api/user";
import { getInstrumentsByCampusId } from "../api/instrument"; // Asegúrate de tener esta función

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

export default function InstrumentAttendanceList() {
  const [instruments, setInstruments] = useState([]);
  const [campusName, setCampusName] = useState("");
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    const { weekDates } = getCurrentWeekDates();
    setWeekDates(weekDates);

    async function fetchInstruments() {
      try {
        const user = await getCurrentUser();
        const campusId = user.selectedCampusId;
        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        const instrumentsData = await getInstrumentsByCampusId(campusId);
        const sortedInstruments = instrumentsData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setInstruments(sortedInstruments);
        setCampusName(
          user.campusId.find((campus) => campus._id === campusId)?.name || ""
        );
      } catch (error) {
        console.error("Error al obtener los datos de los instrumentos:", error);
      }
    }

    fetchInstruments();
  }, []);

  const handleExport = (type) => {
    if (type === "PDF") {
      exportToPDF();
    } else if (type === "Excel") {
      exportToExcel();
    }
  };

  const exportToPDF = () => {
    if (!Array.isArray(instruments)) return;
    const doc = new jsPDF("p", "mm", "a4");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    const text = `Lista de Asistencia - Instrumentos`;
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (doc.internal.pageSize.width - textWidth) / 2, 10);

    doc.autoTable({
      startY: 20,
      head: [["#", "Instrumento", "Id Interno", "Estudiante", ...weekDates]],
      body: instruments.map((instrument, index) => [
        index + 1,
        instrument.name || "Sin nombre",
        instrument.internalId || "Sin ID",
        instrument.student
          ? `${instrument.student.firstName} ${instrument.student.lastName}`
          : "Sin estudiante",
        ...weekDates.map(() => ({
          content: "",
          styles: { halign: "center", cellWidth: 10 },
        })),
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [176, 0, 94], textColor: [255, 255, 255] },
      bodyStyles: { fillColor: [245, 245, 245] },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      margin: { left: 5 },
      theme: "grid",
    });

    doc.save(`Lista_de_Asistencia_Instrumentos_${campusName}.pdf`);
  };

  const exportToExcel = () => {
    if (!Array.isArray(instruments)) return;

    const sheetName = `Lista Instrumentos - ${campusName}`.slice(0, 31);
    const worksheet = XLSX.utils.json_to_sheet(
      instruments.map((instrument, index) => ({
        "#": index + 1,
        Instrumento: instrument.name || "Sin nombre",
        "Id Interno": instrument.internalId || "Sin ID",
        Estudiante: instrument.student
          ? `${instrument.student.firstName} ${instrument.student.lastName}`
          : "Sin estudiante",
        ...Object.fromEntries(weekDates.map((date) => [date, ""])),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(
      workbook,
      `Lista_de_Asistencia_Instrumentos_${campusName}.xlsx`
    );
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
        Lista de Asistencia. Excel
      </button>
    </div>
  );
}
