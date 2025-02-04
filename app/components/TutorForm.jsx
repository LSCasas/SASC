import React from "react";
import { useForm } from "react-hook-form";

const RegisterTutorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos del tutor:", data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="max-h-[550px] overflow-y-auto p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-black">
              Nombre del Tutor
            </label>
            <input
              {...register("nombreTutor", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.nombreTutor && (
              <p className="text-red-500 text-sm">
                {errors.nombreTutor.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Tutor de (Alumno)
            </label>
            <input
              {...register("tutorDe", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Teléfono de Contacto
            </label>
            <input
              {...register("telefonoTutor", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
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
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto py-2 px-4 bg-gradient-to-r bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
          >
            Registrar Tutor
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTutorForm;
