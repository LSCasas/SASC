import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { getStudentsByCampusId } from "../api/student";
import {
  createInstrument,
  updateInstrument,
  getInstrumentById,
} from "../api/instrument";
import { getCurrentUser } from "../api/user";

const InstrumentForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [errorStudents, setErrorStudents] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      studentId: "none",
      assignmentDate: new Date().toISOString().slice(0, 10),
      internalId: "",
      isAchive: false,
      name: "",
    },
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchStudents() {
      try {
        const user = await getCurrentUser();
        const campusId = user.selectedCampusId;
        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        const studentsData = await getStudentsByCampusId(campusId);
        setStudents(
          studentsData.filter((student) => student.status === "activo")
        );
      } catch (err) {
        setErrorStudents(err.message);
      } finally {
        setLoadingStudents(false);
      }
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      async function fetchInstrument() {
        try {
          const instrumentData = await getInstrumentById(id);
          setValue("studentId", instrumentData.studentId?._id || "none");
          setValue("internalId", instrumentData.internalId || "");
          setValue("isAchive", instrumentData.isAchive || false);
          setValue("name", instrumentData.name || "");
          setValue(
            "assignmentDate",
            instrumentData.assignmentDate ||
              new Date().toISOString().slice(0, 10)
          );
          if (instrumentData.studentId) {
            setSelectedStudent(
              students.find((s) => s._id === instrumentData.studentId._id)
            );
          }
        } catch (err) {
          console.error("Error al obtener instrumento:", err);
        }
      }
      fetchInstrument();
    }
  }, [id, setValue, students]);

  const handleStudentChange = (studentId) => {
    const student = students.find((s) => s._id === studentId);
    setSelectedStudent(student || null);

    if (studentId === "none") {
      setValue("assignmentDate", "");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (data.studentId === "none") data.studentId = null;

      if (isEdit) {
        await updateInstrument(id, data);
      } else {
        await createInstrument(data);
      }
      router.push("/instrumentos");
    } catch (error) {
      console.error("Error al guardar instrumento:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="h-[75vh] overflow-y-auto p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-black">Estudiante</label>
            {loadingStudents ? (
              <p className="text-gray-500">Cargando estudiantes...</p>
            ) : errorStudents ? (
              <p className="text-red-500">{errorStudents}</p>
            ) : (
              <select
                {...register("studentId", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full p-2 border rounded text-black"
                onChange={(e) => handleStudentChange(e.target.value)}
              >
                <option value="none">Sin Asignar</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
            )}
          </div>

          {selectedStudent && (
            <div>
              <h3 className="font-semibold text-black">Tutor</h3>
              <p className="font-light text-black">
                {selectedStudent.tutorId?.name}{" "}
                {selectedStudent.tutorId?.lastname}
              </p>
            </div>
          )}

          <div>
            <label className="block font-semibold text-black">
              Nombre del Instrumento
            </label>
            <input
              type="text"
              {...register("name", { required: "Este campo es obligatorio" })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {!isEdit && (
            <div>
              <label className="block font-semibold text-black">
                Fecha de Asignación
              </label>
              <input
                type="date"
                {...register("assignmentDate", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full p-2 border rounded text-black"
              />
              {errors.assignmentDate && (
                <p className="text-red-500 text-sm">
                  {errors.assignmentDate.message}
                </p>
              )}
            </div>
          )}

          {isEdit && (
            <div>
              <button
                type="button"
                className="md:w-[30vh] w-[20vh]  py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                Agregar o Modificar Fecha de Asignación
              </button>
              {showDatePicker && (
                <div className="mt-2">
                  <label className="block font-semibold text-black">
                    Nueva Fecha
                  </label>
                  <input
                    type="date"
                    {...register("assignmentDate")}
                    className="w-full p-2 border rounded text-black"
                  />
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block font-semibold text-black">Id Interno</label>
            <input
              type="text"
              {...register("internalId", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.internalId && (
              <p className="text-red-500 text-sm">
                {errors.internalId.message}
              </p>
            )}
          </div>

          {isEdit && (
            <div>
              <label className="block font-semibold text-black">Estado</label>
              <select
                {...register("isAchive")}
                className="w-full p-2 border rounded text-black"
              >
                <option value={false}>Activo</option>
                <option value={true}>Baja</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
          >
            {isEdit ? "Actualizar Instrumento" : "Crear Instrumento"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstrumentForm;
