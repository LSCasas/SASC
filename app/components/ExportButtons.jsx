import React from "react";

export default function ExportButtons() {
  return (
    <div className="flex space-x-4 mt-4">
      <button className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]">
        Exportar a PDF
      </button>
      <button className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]">
        Exportar a Excel
      </button>
    </div>
  );
}
