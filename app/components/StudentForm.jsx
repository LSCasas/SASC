import React from "react";
import { useForm } from "react-hook-form";

const StudentForm = () => {
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
              Nombre del Alumno
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
              Apellidos del Alumno
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
            <label className="block font-semibold text-black">CURP</label>
            <input
              {...register("curp", { required: "Este campo es obligatorio" })}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Nombre Tutor
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
              CURP del Tutor
            </label>
            <input
              {...register("curp", { required: "Este campo es obligatorio" })}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">Estatus</label>
            <input
              {...register("telefonoTutor", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Teléfono Tutor
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
              {...register("sedeCultural")}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Inscrito Desde
            </label>
            <input
              type="date"
              {...register("inscritoDesde")}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">Curso</label>
            <input
              {...register("curso")}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Cursos Anteriores
            </label>
            <input
              {...register("cursosAnteriores")}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">Genero</label>
            <select
              {...register("orquestaSinfónica")}
              className="w-full p-2 border rounded text-black"
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-black">
              Condiciones Médicas
            </label>
            <input
              {...register("condicionesMedicas")}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Necesidades Especiales
            </label>
            <input
              {...register("necesidadesEspeciales")}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-black">
              Documentos Requeridos
            </label>
            <input
              {...register("documentosRequeridos")}
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

export default StudentForm;
