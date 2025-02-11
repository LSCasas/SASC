import React from "react";
import { useForm } from "react-hook-form";
const FormerStudentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos del alumno:", data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="max-h-[550px] overflow-y-auto p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-black">
              Nombre Tutor
            </label>
            <input
              {...register("nombreTutor", {
                required: "Este campo es obligatorio",
              })}
              defaultValue="Juan Pérez"
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
              Teléfono Tutor
            </label>
            <input
              {...register("telefonoTutor", {
                required: "Este campo es obligatorio",
              })}
              defaultValue="555-123-4567"
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">CURP</label>
            <input
              {...register("curp", { required: "Este campo es obligatorio" })}
              defaultValue="JUAP890101HDFRRL09"
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Sede Cultural
            </label>
            <input
              {...register("sedeCultural")}
              defaultValue="Sede Cultural de Tultepec"
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">Baja Desde</label>
            <input
              type="date"
              {...register("inscritoDesde")}
              defaultValue="2023-02-01"
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">Estado</label>
            <input
              {...register("curso")}
              defaultValue="Violín Intermedio"
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Instrumento
            </label>
            <input
              {...register("instrumento")}
              defaultValue="Violín"
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Cursos Anteriores
            </label>
            <input
              {...register("cursosAnteriores")}
              defaultValue="Violín Básico, Solfeo"
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Documentos Requeridos
            </label>
            <input
              {...register("documentosRequeridos")}
              defaultValue="Acta de nacimiento, CURP"
              className="w-full p-2 border rounded text-black"
            />
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

export default FormerStudentForm;
