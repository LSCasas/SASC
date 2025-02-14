import React from "react";
import { useForm } from "react-hook-form";

const CampusForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos de la campus:", data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="max-h-[550px] overflow-y-auto p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-black">Nombre</label>
            <input
              {...register("nombre", { required: "Este campo es obligatorio" })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">Dirección</label>
            <textarea
              {...register("direccion", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.direccion && (
              <p className="text-red-500 text-sm">{errors.direccion.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Teléfono de Contacto
            </label>
            <input
              {...register("telefono_contacto", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.telefono_contacto && (
              <p className="text-red-500 text-sm">
                {errors.telefono_contacto.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto py-2 px-4 bg-gradient-to-r bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampusForm;
