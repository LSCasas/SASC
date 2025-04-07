import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { getCurrentUser } from "../api/user";

export default function ClassScheduleExportButtons({ data }) {
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

    const doc = new jsPDF("l", "mm", "a4");
    const marginLeft = 5;
    const tableWidth = doc.internal.pageSize.getWidth() - marginLeft - 5;

    const tableData = data.map((classItem) => ({
      Clase: classItem.name || "Sin nombre",
      Instructor: classItem.teacherId
        ? `${classItem.teacherId.firstName} ${classItem.teacherId.lastName}`
        : "Sin asignar",
      Lunes: classItem.schedule?.Lunes
        ? `${classItem.schedule.Lunes.startTime} - ${classItem.schedule.Lunes.endTime}`
        : "",
      Martes: classItem.schedule?.Martes
        ? `${classItem.schedule.Martes.startTime} - ${classItem.schedule.Martes.endTime}`
        : "",
      Miercoles: classItem.schedule?.Miercoles
        ? `${classItem.schedule.Miercoles.startTime} - ${classItem.schedule.Miercoles.endTime}`
        : "",
      Jueves: classItem.schedule?.Jueves
        ? `${classItem.schedule.Jueves.startTime} - ${classItem.schedule.Jueves.endTime}`
        : "",
      Viernes: classItem.schedule?.Viernes
        ? `${classItem.schedule.Viernes.startTime} - ${classItem.schedule.Viernes.endTime}`
        : "",
      Sabado: classItem.schedule?.Sabado
        ? `${classItem.schedule.Sabado.startTime} - ${classItem.schedule.Sabado.endTime}`
        : "",
      Domingo: classItem.schedule?.Domingo
        ? `${classItem.schedule.Domingo.startTime} - ${classItem.schedule.Domingo.endTime}`
        : "",
    }));

    doc.autoTable({
      startY: 10,
      head: [
        [
          "Clase",
          "Instructor",
          "Lunes",
          "Martes",
          "Miercoles",
          "Jueves",
          "Viernes",
          "Sabado",
          "Domingo",
        ],
      ],
      body: tableData.map((row) => [
        row.Clase,
        row.Instructor,
        row.Lunes,
        row.Martes,
        row.Miercoles,
        row.Jueves,
        row.Viernes,
        row.Sabado,
        row.Domingo,
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

    doc.save(`Horario_de_Clases_${campusName}.pdf`);
  };

  const exportToExcel = () => {
    if (!Array.isArray(data)) return;

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((classItem, index) => ({
        "#": index + 1,
        Nombre: classItem.name || "Sin nombre",
        Profesor: classItem.teacherId
          ? `${classItem.teacherId.firstName} ${classItem.teacherId.lastName}`
          : "Sin asignar",
        Lunes: classItem.schedule?.Lunes
          ? `${classItem.schedule.Lunes.startTime} - ${classItem.schedule.Lunes.endTime}`
          : "",
        Martes: classItem.schedule?.Martes
          ? `${classItem.schedule.Martes.startTime} - ${classItem.schedule.Martes.endTime}`
          : "",
        Miercoles: classItem.schedule?.Miercoles
          ? `${classItem.schedule.Miercoles.startTime} - ${classItem.schedule.Miercoles.endTime}`
          : "",
        Jueves: classItem.schedule?.Jueves
          ? `${classItem.schedule.Jueves.startTime} - ${classItem.schedule.Jueves.endTime}`
          : "",
        Viernes: classItem.schedule?.Viernes
          ? `${classItem.schedule.Viernes.startTime} - ${classItem.schedule.Viernes.endTime}`
          : "",
        Sabado: classItem.schedule?.Sabado
          ? `${classItem.schedule.Sabado.startTime} - ${classItem.schedule.Sabado.endTime}`
          : "",
        Domingo: classItem.schedule?.Domingo
          ? `${classItem.schedule.Domingo.startTime} - ${classItem.schedule.Domingo.endTime}`
          : "",
      }))
    );

    const workbook = XLSX.utils.book_new();

    const sheetName = `Horario de Clases - ${campusName}`.slice(0, 31);

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    XLSX.writeFile(workbook, `Horario_de_Clases_${campusName}.xlsx`);
  };

  return (
    <div className="flex justify-center mt-4 space-x-4">
      <button
        onClick={() => handleExport("PDF")}
        className="py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Exportar Horario. PDF
      </button>
      <button
        onClick={() => handleExport("Excel")}
        className="py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Exportar Horario. EXCEL
      </button>
    </div>
  );
}
