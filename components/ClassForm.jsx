import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createClass, updateClass, getClassById } from "../api/class";
import { getCurrentUser } from "../api/user";
import { getTeachersByCampusId } from "../api/teacher";

const ClassForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [errorTeachers, setErrorTeachers] = useState(null);
  const [schedule, setSchedule] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      generation: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      teacherId: "none",
      schedule: {},
    },
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const user = await getCurrentUser();
        const campusId = user.selectedCampusId;
        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let teachersData = await getTeachersByCampusId(campusId);
        teachersData = teachersData.filter(
          (teacher) => teacher.isAchive === false
        );
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
          setValue("schedule", classData.schedule || {});
          setValue("isAchive", classData.isAchive || false);
          setSchedule(classData.schedule || {});
        } catch (err) {
          console.error("Error al obtener clase:", err);
        }
      }
      fetchClass();
    }
  }, [id, setValue]);

  const handleScheduleChange = (day, field, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const onSubmit = async (data) => {
    try {
      data.schedule = schedule;

      if (!isEdit) {
        data.name = `${data.name} ${data.generation}`;
      }

      if (Object.keys(schedule).length === 0) {
        return alert("Debes seleccionar al menos un día");
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
      <div className="h-[80vh] overflow-y-auto p-2">
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
              Selecciona al profesor que imparte la clase.
            </label>
            {loadingTeachers ? (
              <p className="text-gray-500">Cargando profesores...</p>
            ) : errorTeachers ? (
              <p className="text-red-500">{errorTeachers}</p>
            ) : (
              <>
                <select
                  {...register("teacherId", {
                    required: "Este campo es obligatorio",
                  })}
                  className="w-full p-2 border rounded text-black"
                  defaultValue=""
                >
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.firstName} {teacher.lastName}
                    </option>
                  ))}
                </select>
                {errors.teacherId && (
                  <p className="text-red-500 text-sm">
                    {errors.teacherId.message}
                  </p>
                )}
              </>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">Generación</label>
            <select
              {...register("generation")}
              className="w-full p-2 border rounded text-black"
            >
              {Array.from({ length: 11 }, (_, i) => {
                const startYear = new Date().getFullYear() - 5 + i;
                return (
                  <option
                    key={startYear}
                    value={`${startYear}-${startYear + 1}`}
                  >
                    {startYear}-{startYear + 1}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-black">
              Horario por día
            </label>
            <div className="grid grid-cols-2 gap-2 text-black">
              {[
                "Lunes",
                "Martes",
                "Miercoles",
                "Jueves",
                "Viernes",
                "Sabado",
                "Domingo",
              ].map((dia) => (
                <div key={dia} className="border p-2 rounded-lg">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSchedule((prev) => ({
                            ...prev,
                            [dia]: { startTime: "16:00", endTime: "19:00" },
                          }));
                        } else {
                          setSchedule((prev) => {
                            const newSchedule = { ...prev };
                            delete newSchedule[dia];
                            return newSchedule;
                          });
                        }
                      }}
                      checked={!!schedule[dia]}
                      className="w-5 h-5"
                    />
                    <span>{dia}</span>
                  </label>
                  {schedule[dia] && (
                    <div className="mt-2">
                      <label className="block text-sm">Hora de inicio</label>
                      <input
                        type="time"
                        value={schedule[dia]?.startTime || ""}
                        onChange={(e) =>
                          handleScheduleChange(dia, "startTime", e.target.value)
                        }
                        className="w-full p-2 border rounded text-black"
                      />
                      <label className="block text-sm mt-2">
                        Hora de finalización
                      </label>
                      <input
                        type="time"
                        value={schedule[dia]?.endTime || ""}
                        onChange={(e) =>
                          handleScheduleChange(dia, "endTime", e.target.value)
                        }
                        className="w-full p-2 border rounded text-black"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
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
            {isEdit ? "Actualizar Clase" : "Crear Clase"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassForm;
