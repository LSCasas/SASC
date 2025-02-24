import React from "react";
import { useForm } from "react-hook-form";

const ClassForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      generation: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    },
  });

  const onSubmit = (data) => {
    console.log("Datos de la clase:", data);
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
            <input
              {...register("teacherId", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.teacherId && (
              <p className="text-red-500 text-sm">{errors.teacherId.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">Generación</label>
            <input
              {...register("generation", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
              readOnly
            />
            {errors.generation && (
              <p className="text-red-500 text-sm">
                {errors.generation.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Días de clase
            </label>
            <div className="grid grid-cols-2 gap-2 text-black">
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map(
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
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassForm;
