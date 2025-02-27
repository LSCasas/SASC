import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createStudent, updateStudent, getStudentById } from "../api/student";
import { getClassesByCampusId } from "../api/class";
import { getUserById } from "../api/user";

const TransferForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [errorClasses, setErrorClasses] = useState(null);
  const [studentData, setStudentData] = useState(null); // Estado para guardar los datos del estudiante

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchClasses() {
      try {
        const user = await getUserById();
        const campusId = user.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let classesData = await getClassesByCampusId(campusId);
        classesData = classesData.sort((a, b) => a.name.localeCompare(b.name));

        setClasses(classesData);
      } catch (err) {
        setErrorClasses(err.message);
      } finally {
        setLoadingClasses(false);
      }
    }

    fetchClasses();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      async function fetchStudent() {
        try {
          const studentData = await getStudentById(id);
          setStudentData(studentData); // Guardar los datos del estudiante en el estado
          setValue("nombreAlumno", studentData.firstName);
          setValue("apellidosAlumno", studentData.lastName);
          setValue("curso", studentData.ClassId || "none");
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
        firstName: data.nombreAlumno,
        lastName: data.apellidosAlumno,
        campusEnvio: data.campusEnvio,
        claseEnvio: data.claseEnvio,
      };

      if (data.curso !== "none") {
        formattedData.ClassId = data.curso;
      }

      if (isEdit) {
        await updateStudent(id, formattedData);
      } else {
        await createStudent(formattedData);
      }

      router.push("/alumnos");
    } catch (error) {
      console.error("Error al guardar estudiante:", error);
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
              className="w-full p-2 border rounded text-black bg-gray-100 "
              readOnly
            />
          </div>
        )}

        <div>
          <label className="block font-semibold text-black">
            Campus de Envío
          </label>
          <input
            {...register("campusEnvio", {
              required: "Este campo es obligatorio",
            })}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-black">
            Clase de Envío
          </label>
          <input
            {...register("claseEnvio", {
              required: "Este campo es obligatorio",
            })}
            className="w-full p-2 border rounded text-black"
          />
        </div>
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
