import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createClass, updateClass, getClassById } from "../api/class";
import { getUserById } from "../api/user";
import { getTeachersByCampusId } from "../api/teacher";

const ClassForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [errorTeachers, setErrorTeachers] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      generation: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      teacherId: "none", // Valor por defecto para que la clase pueda crearse sin profesor.
    },
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const user = await getUserById();
        const campusId = user.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let teachersData = await getTeachersByCampusId(campusId);
        teachersData = teachersData.sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );

        setTeachers(teachersData);
      } catch (err) {
        setErrorTeachers(err.message);
      } finally {
        setLoadingTeachers(false);
      }
    }

    fetchTeachers();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      async function fetchClass() {
        try {
          const classData = await getClassById(id);
          setValue("name", classData.name);
          setValue("teacherId", classData.teacherId?._id || "none");
          setValue("generation", classData.generation);
          setValue("days", classData.days);
          setValue("startTime", classData.startTime);
          setValue("endTime", classData.endTime);
        } catch (err) {
          console.error("Error al obtener clase:", err);
        }
      }
      fetchClass();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (data.teacherId === "none") {
        data.teacherId = null; // Enviar null si no se selecciona profesor
      }

      if (isEdit) {
        await updateClass(id, data);
      } else {
        await createClass(data);
      }
      router.push("/clases");
    } catch (error) {
      console.error("Error al guardar clase:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="max-h-[550px] overflow-y-auto p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-black">
              Nombre de la Clase
            </label>
            <input
              {...register("name", { required: "Este campo es obligatorio" })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Profesor que imparte la clase
            </label>
            {loadingTeachers ? (
              <p className="text-gray-500">Cargando profesores...</p>
            ) : errorTeachers ? (
              <p className="text-red-500">{errorTeachers}</p>
            ) : (
              <select
                {...register("teacherId")}
                className="w-full p-2 border rounded text-black"
              >
                <option value="none">Sin asignar</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.firstName} {teacher.lastName}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">Generación</label>
            <input
              {...register("generation")}
              className="w-full p-2 border rounded text-black"
              readOnly
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Días de clase
            </label>
            <div className="grid grid-cols-2 gap-2 text-black">
              {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"].map(
                (dia) => (
                  <label key={dia} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("days")}
                      value={dia}
                      className="w-5 h-5"
                    />
                    <span>{dia}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-black">
              Hora de inicio
            </label>
            <input
              type="time"
              {...register("startTime", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.startTime && (
              <p className="text-red-500 text-sm">{errors.startTime.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Hora de finalización
            </label>
            <input
              type="time"
              {...register("endTime", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.endTime && (
              <p className="text-red-500 text-sm">{errors.endTime.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto py-2 px-4 bg-gradient-to-r bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
          >
            {isEdit ? "Actualizar Clase" : "Crear Clase"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassForm;
