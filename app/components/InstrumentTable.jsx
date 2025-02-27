import React, { useEffect, useState } from "react";
import InstrumentFilters from "./InstrumentFilters";
import ExportButtons from "./InstrumentExportButtons";
import Link from "next/link";
import { getUserById } from "../api/user";
import { getInstrumentsByCampusId } from "../api/instrument";

export default function InstrumentTable() {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ownerSearchTerm, setOwnerSearchTerm] = useState("");
  const [internalIdSearchTerm, setInternalIdSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const [ownerFilter, setOwnerFilter] = useState("");

  useEffect(() => {
    async function fetchInstruments() {
      try {
        const user = await getUserById();
        const campusId = user.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let instrumentsData = await getInstrumentsByCampusId(campusId);

        instrumentsData = instrumentsData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setInstruments(instrumentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInstruments();
  }, []);

  if (loading) return <p className="text-center text-black">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Apply filtering if there are search terms or filters, otherwise return all instruments
  const filteredInstruments = instruments.filter((instrument) => {
    const matchesName = instrument.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesInternalId = instrument.internalId
      .toLowerCase()
      .includes(internalIdSearchTerm.toLowerCase());

    const matchesOwner =
      instrument.studentId?.firstName
        .toLowerCase()
        .includes(ownerSearchTerm.toLowerCase()) ||
      instrument.studentId?.lastName
        .toLowerCase()
        .includes(ownerSearchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "active"
        ? instrument.isAchive === false
        : instrument.isAchive === true;

    const matchesOwnerFilter =
      ownerFilter === "yes"
        ? instrument.studentId
        : ownerFilter === "no"
        ? !instrument.studentId
        : true;

    // Only filter if there are filter conditions set
    return (
      (searchTerm ? matchesName : true) &&
      (internalIdSearchTerm ? matchesInternalId : true) &&
      (ownerSearchTerm ? matchesOwner : true) &&
      (statusFilter ? matchesStatus : true) &&
      (ownerFilter ? matchesOwnerFilter : true)
    );
  });

  return (
    <div className="mt-6">
      <InstrumentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        ownerSearchTerm={ownerSearchTerm}
        setOwnerSearchTerm={setOwnerSearchTerm}
        internalIdSearchTerm={internalIdSearchTerm}
        setInternalIdSearchTerm={setInternalIdSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        ownerFilter={ownerFilter}
        setOwnerFilter={setOwnerFilter}
      />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Instrumento</th>
              <th className="p-3 border-b text-black">Id Interno</th>
              <th className="p-3 border-b text-black">Estudiante</th>
              <th className="p-3 border-b text-black">Fecha Asignación</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstruments.length > 0 ? (
              filteredInstruments.map((instrument, index) => (
                <tr key={instrument._id}>
                  <td className="p-3 border-b">
                    <Link
                      href={`/formularioDeInstrumentos?id=${instrument._id}`}
                    >
                      {index + 1}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link
                      href={`/formularioDeInstrumentos?id=${instrument._id}`}
                    >
                      {instrument.name}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link
                      href={`/formularioDeInstrumentos?id=${instrument._id}`}
                    >
                      {instrument.internalId}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link
                      href={`/formularioDeInstrumentos?id=${instrument._id}`}
                    >
                      {instrument.studentId && instrument.studentId.firstName
                        ? `${instrument.studentId.firstName} ${instrument.studentId.lastName}`
                        : "Sin Asignar"}
                    </Link>
                  </td>
                  <td className="p-3 border-b">
                    <Link
                      href={`/formularioDeInstrumentos?id=${instrument._id}`}
                    >
                      {instrument.assignmentDate
                        ? new Date(
                            instrument.assignmentDate
                          ).toLocaleDateString()
                        : "Sin Asignar"}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-black">
                  No hay registros disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={filteredInstruments} />
        </div>
      </div>
    </div>
  );
}
