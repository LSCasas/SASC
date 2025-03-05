import React from "react";

const StudentInfoCard = ({ student }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Campo</th>
            <th className="py-3 px-6 text-left">Valor</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {Object.entries(student).map(([key, value]) => (
            <tr key={key} className="border-b border-gray-200">
              <td className="py-3 px-6 font-semibold">
                {key.replace(/_/g, " ")}
              </td>
              <td className="py-3 px-6">
                {Array.isArray(value)
                  ? value.join(", ")
                  : value || "No especificado"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentInfoCard;
