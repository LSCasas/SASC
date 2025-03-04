import React, { useEffect, useState } from "react";
import TransferFilters from "./TransferFilters";
import ExportButtons from "./TransferExportButtons";
import { getCurrentUser } from "../api/user";
import { getTransfersByCampusId } from "../api/transfer";

export default function TransferTable() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nameFilter, setNameFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    async function fetchTransfers() {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        const campusId = user?.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        const transferData = await getTransfersByCampusId(campusId);
        if (transferData) {
          setTransfers(transferData);
        } else {
          setTransfers([]); // Si no hay datos, establece un arreglo vacío
        }
      } catch (err) {
        setError(err.message);
        setTransfers([]); // En caso de error, establece un arreglo vacío
      } finally {
        setLoading(false);
      }
    }
    fetchTransfers();
  }, []);

  if (loading) return <p className="text-center text-black">Cargando...</p>;

  const filteredTransfers = (transfers || []).filter((transfer) => {
    const matchesName =
      transfer.studentId?.firstName
        .toLowerCase()
        .includes(nameFilter.toLowerCase()) ||
      transfer.studentId?.lastName
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
    const matchesClass =
      transfer.originClass?.name
        .toLowerCase()
        .includes(classFilter.toLowerCase()) ||
      transfer.destinationClass?.name
        .toLowerCase()
        .includes(classFilter.toLowerCase());
    const matchesGender =
      genderFilter === "" ||
      transfer.studentId?.gender
        .toLowerCase()
        .includes(genderFilter.toLowerCase());
    const matchesLocation =
      transfer.originLocationId?.name
        .toLowerCase()
        .includes(locationFilter.toLowerCase()) ||
      transfer.destinationLocationId?.name
        .toLowerCase()
        .includes(locationFilter.toLowerCase());

    return matchesName && matchesClass && matchesGender && matchesLocation;
  });

  return (
    <div className="mt-6">
      <TransferFilters
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        classFilter={classFilter}
        setClassFilter={setClassFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
      />
      <div className="overflow-y-auto h-[50vh]">
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
            {filteredTransfers.length > 0 ? (
              filteredTransfers.map((transfer, index) => (
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
                  No hay registros disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={filteredTransfers} />
        </div>
      </div>
    </div>
  );
}
