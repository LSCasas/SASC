import React from "react";
import { useForm } from "react-hook-form";

const TeacherForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos del profesor:", data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="max-h-[550px] overflow-y-auto p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-black">
              Nombre del Profesor
            </label>
            <input
              {...register("nombreProfesor", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.nombreProfesor && (
              <p className="text-red-500 text-sm">
                {errors.nombreProfesor.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Clase que Imparte
            </label>
            <input
              {...register("claseImparte", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.claseImparte && (
              <p className="text-red-500 text-sm">
                {errors.claseImparte.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Teléfono de Contacto
            </label>
            <input
              {...register("telefonoContacto", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.telefonoContacto && (
              <p className="text-red-500 text-sm">
                {errors.telefonoContacto.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Correo Electrónico
            </label>
            <input
              {...register("emailProfesor", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Por favor ingresa un correo electrónico válido",
                },
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.emailProfesor && (
              <p className="text-red-500 text-sm">
                {errors.emailProfesor.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Sede Cultural
            </label>
            <input
              {...register("sedeCultural", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.sedeCultural && (
              <p className="text-red-500 text-sm">
                {errors.sedeCultural.message}
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

export default TeacherForm;
