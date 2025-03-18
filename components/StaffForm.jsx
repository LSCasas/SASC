import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createStaff, updateStaff, getStaffById } from "../api/staff";
import { useRouter } from "next/router";

const StaffForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [staffData, setStaffData] = useState(null);
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
      async function fetchStaff() {
        try {
          const staff = await getStaffById(id);
          setStaffData(staff);
          setValue("firstName", staff.firstName);
          setValue("lastName", staff.lastName);
          setValue("phone", staff.phone);
          setValue("email", staff.email);
          setValue("isAchive", staff.isAchive);
        } catch (err) {
          console.error("Error al obtener Staff:", err);
        }
      }

      fetchStaff();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateStaff(id, data);
      } else {
        await createStaff(data);
      }
      router.push("/personal");
    } catch (error) {
      console.error("Error al guardar Staff:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="h-[70vh] overflow-y-auto p-2">
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
              Correo Electrónico (Opcional)
            </label>
            <input
              {...register("email", {
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
            {isEdit ? "Actualizar Personal" : "Crear Personal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffForm;
