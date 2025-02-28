import React, { useEffect, useState } from "react";
import TransferFilters from "./TransferFilters";
import ExportButtons from "./TeacherExportButtons";
import { getUserById } from "../api/user";
import { getTransfersByCampusId } from "../api/transfer";

export default function TransferTable() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransfers() {
      try {
        setLoading(true);
        const user = await getUserById();
        const campusId = user?.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        const transferData = await getTransfersByCampusId(campusId);

        setTransfers(transferData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTransfers();
  }, []);

  if (loading) return <p className="text-center text-black">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="mt-6">
      <TransferFilters />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Apellidos</th>
              <th className="p-3 border-b text-black">Clase de origen</th>
              <th className="p-3 border-b text-black">Sede de Origen</th>
              <th className="p-3 border-b text-black">Clase de recepción</th>
              <th className="p-3 border-b text-black">Sede de Recepción</th>
              <th className="p-3 border-b text-black">
                Fecha de Transferencia
              </th>
            </tr>
          </thead>
          <tbody>
            {transfers.length > 0 ? (
              transfers.map((transfer, index) => (
                <tr key={transfer._id}>
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">
                    {transfer.studentId?.firstName || "N/A"}
                  </td>
                  <td className="p-3 border-b">
                    {transfer.studentId?.lastName || "N/A"}
                  </td>
                  <td className="p-3 border-b">
                    {transfer.originClass?.name || "N/A"}
                  </td>
                  <td className="p-3 border-b">
                    {transfer.originLocationId?.name || "N/A"}
                  </td>
                  <td className="p-3 border-b">
                    {transfer.destinationClass?.name || "N/A"}
                  </td>
                  <td className="p-3 border-b">
                    {transfer.destinationLocationId?.name || "N/A"}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(transfer.transferDate).toLocaleString() || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-3 text-center text-black">
                  No hay transferencias disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={transfers} />
        </div>
      </div>
    </div>
  );
}
