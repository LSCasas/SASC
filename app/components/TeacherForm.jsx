import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTeacher, updateTeacher, getTeacherById } from "../api/teacher";
import { useRouter } from "next/router";

const TeacherForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      async function fetchTeacher() {
        try {
          const teacher = await getTeacherById(id);
          setTeacherData(teacher);
          setValue("firstName", teacher.firstName);
          setValue("lastName", teacher.lastName);
          setValue("phone", teacher.phone);
          setValue("email", teacher.email);
          setValue("isAchive", teacher.isAchive);
        } catch (err) {
          console.error("Error al obtener docente:", err);
        }
      }

      fetchTeacher();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateTeacher(id, data);
      } else {
        await createTeacher(data);
      }
      router.push("/docentes");
    } catch (error) {
      console.error("Error al guardar docente:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="max-h-[550px] overflow-y-auto p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-black">Nombre</label>
            <input
              {...register("firstName", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">Apellidos</label>
            <input
              {...register("lastName", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Teléfono de Contacto
            </label>
            <input
              {...register("phone", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Correo Electrónico
            </label>
            <input
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Por favor ingresa un correo electrónico válido",
                },
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          {isEdit && (
            <div>
              <label className="block font-semibold text-black">
                Estatus (Activo/ Baja)
              </label>
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
            className="w-full sm:w-auto py-2 px-4 bg-gradient-to-r bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
          >
            {isEdit ? "Actualizar Docente" : "Crear Docente"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherForm;
