import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createTransfer } from "../api/transfer";
import { getClassesByCampusId } from "../api/class";
import { getAllCampuses } from "../api/campus";
import { getStudentById } from "../api/student";

const TransferForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [classes, setClasses] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [errorClasses, setErrorClasses] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const campusesData = await getAllCampuses();
        setCampuses(campusesData.filter((campus) => !campus.isAchive));
      } catch (err) {
        console.error("Error al obtener los campus:", err);
      }
    }

    fetchCampuses();
  }, []);

  useEffect(() => {
    async function fetchClasses(campusId) {
      try {
        if (!campusId) return;
        setLoadingClasses(true);
        const classesData = await getClassesByCampusId(campusId);
        setClasses(classesData.filter((classItem) => !classItem.isAchive));
      } catch (err) {
        setErrorClasses(err.message);
      } finally {
        setLoadingClasses(false);
      }
    }

    if (selectedCampus) {
      fetchClasses(selectedCampus);
    }
  }, [selectedCampus]);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      async function fetchStudent() {
        try {
          const studentData = await getStudentById(id);
          setStudentData(studentData);
          setValue("nombreAlumno", studentData.firstName);
          setValue("apellidosAlumno", studentData.lastName);
          setValue("curso", studentData.ClassId || "none");
          setSelectedCampus(studentData.campusId);
          setSelectedClass(studentData.ClassId);
        } catch (err) {
          console.error("Error al obtener estudiante:", err);
        }
      }
      fetchStudent();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        studentId: id,
        originLocationId: studentData?.campusId?._id,
        destinationLocationId: data.campusEnvio,
        originClass: studentData?.ClassId?._id,
        destinationClass: selectedClass,
      };

      await createTransfer(formattedData);

      router.push("/transferencias");
    } catch (error) {
      console.error("Error al realizar la transferencia:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold text-black">
            Nombre del Alumno
          </label>
          <input
            {...register("nombreAlumno", {
              required: "Este campo es obligatorio",
            })}
            className="w-full p-2 border rounded text-black"
            disabled={isEdit}
          />
        </div>

        {isEdit && studentData && (
          <div>
            <label className="block font-semibold text-black">
              Curso Actual
            </label>
            <input
              value={studentData.ClassId ? studentData.ClassId.name : ""}
              className="w-full p-2 border rounded text-black bg-gray-50"
              readOnly
            />
          </div>
        )}

        {isEdit && studentData && (
          <div>
            <label className="block font-semibold text-black">
              Campus Actual
            </label>
            <input
              value={studentData.campusId ? studentData.campusId.name : ""}
              className="w-full p-2 border rounded text-black bg-gray-50"
              readOnly
            />
          </div>
        )}

        <div>
          <label className="block font-semibold text-black">
            Campus de Envío
          </label>
          <select
            {...register("campusEnvio", {
              required: "Este campo es obligatorio",
            })}
            onChange={(e) => setSelectedCampus(e.target.value)}
            className="w-full p-2 border rounded text-black"
          >
            <option value="">Seleccionar Campus</option>
            {campuses.map((campus) => (
              <option key={campus._id} value={campus._id}>
                {campus.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCampus && (
          <div>
            <label className="block font-semibold text-black">
              Clase de Envío
            </label>
            <select
              {...register("curso", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
              disabled={loadingClasses}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Seleccionar Clase</option>
              {classes.map((classItem) => (
                <option key={classItem._id} value={classItem._id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full sm:w-auto py-2 px-4 bg-gradient-to-r bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
        >
          {isEdit ? "Actualizar Estudiante" : "Transferir Estudiante"}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
