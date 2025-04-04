import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createStudent, updateStudent, getStudentById } from "../api/student";
import { getClassesByCampusId } from "../api/class";
import { getCurrentUser } from "../api/user";

const StudentForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [previousClasses, setPreviousClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [errorClasses, setErrorClasses] = useState(null);
  const handleRemovePreviousClass = (classId) => {
    setPreviousClasses((prev) => prev.filter((cls) => cls._id !== classId));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      curso: "none",
      birthDate: "",
    },
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchClasses() {
      try {
        const user = await getCurrentUser();
        const campusId = user.selectedCampusId;

        if (!campusId)
          throw new Error("El usuario no tiene un campus seleccionado");

        let classesData = await getClassesByCampusId(campusId);
        classesData = classesData.sort((a, b) => a.name.localeCompare(b.name));

        setClasses(classesData);
      } catch (err) {
        setErrorClasses(err.message);
      } finally {
        setLoadingClasses(false);
      }
    }

    fetchClasses();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      async function fetchStudent() {
        try {
          const studentData = await getStudentById(id);
          setStudentData(studentData);

          setPreviousClasses(studentData.previousClasses || []);

          setValue("nombreAlumno", studentData.firstName);
          setValue("apellidosAlumno", studentData.lastName);
          setValue("domicilio", studentData.address);
          setValue("curp", studentData.curp);
          setValue("estatus", studentData.status || "activo");
          if (studentData.tutorId) {
            setValue("nombreTutor", studentData.tutorId.name || "");
            setValue("apellidosTutor", studentData.tutorId.lastname || "");
            setValue("telefonoTutor", studentData.tutorId.phone || "");
          }

          const inscritoDesde = new Date(studentData.createdAt)
            .toISOString()
            .split("T")[0];
          setValue("inscritoDesde", inscritoDesde);

          const birthDate = studentData.birthDate
            ? new Date(studentData.birthDate).toISOString().split("T")[0]
            : "";
          setValue("birthDate", birthDate);

          setValue(
            "curso",
            studentData.ClassId ? studentData.ClassId._id : "none"
          );

          const previousClassNames = studentData.previousClasses
            ? studentData.previousClasses.map((cls) => cls.name).join(", ")
            : "";
          setValue("cursosAnteriores", previousClassNames);

          setValue("genero", studentData.gender);
          setValue("condicionesMedicas", studentData.medicalConditions || "");
          setValue("necesidadesEspeciales", studentData.specialNeeds || "");
          setValue("documentosRequeridos", studentData.requiredDocuments || "");
        } catch (err) {
          console.error("Error al obtener estudiante:", err);
        }
      }
      fetchStudent();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        firstName: data.nombreAlumno,
        lastName: data.apellidosAlumno,
        address: data.domicilio,
        curp: data.curp,
        gender: data.genero,
        medicalConditions: data.condicionesMedicas || null,
        specialNeeds: data.necesidadesEspeciales || null,
        requiredDocuments: null,
        tutorName: data.nombreTutor,
        tutorLastname: data.apellidosTutor,
        tutorPhone: data.telefonoTutor,
        status: data.estatus,
        birthDate: data.birthDate,
      };

      if (data.curso && data.curso !== "none") {
        formattedData.ClassId = data.curso;
      } else if (studentData && studentData.ClassId) {
        formattedData.ClassId = studentData.ClassId._id;
      }

      if (isEdit) {
        await updateStudent(id, formattedData);
      } else {
        await createStudent(formattedData);
      }

      router.push("/alumnos");
    } catch (error) {
      console.error("Error al guardar estudiante:", error);
    }
  };

  const renderTutorInfo = () => {
    if (!studentData) return null;

    const tutorCreatedAt = new Date(
      studentData.tutorId.createdAt
    ).toLocaleDateString();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="h-[75vh] overflow-y-auto p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {renderTutorInfo()}
          <div>
            <label className="block font-semibold text-black">
              Nombre del Alumno
            </label>
            <input
              {...register("nombreAlumno", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.nombreAlumno && (
              <p className="text-red-500 text-sm">
                {errors.nombreAlumno.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-semibold text-black">
              Apellidos del Alumno
            </label>
            <input
              {...register("apellidosAlumno", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.apellidosAlumno && (
              <p className="text-red-500 text-sm">
                {errors.apellidosAlumno.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">Domicilio</label>
            <input
              {...register("domicilio", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.domicilio && (
              <p className="text-red-500 text-sm">{errors.domicilio.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">CURP</label>
            <input
              {...register("curp", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.curp && (
              <p className="text-red-500 text-sm">{errors.curp.message}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold text-black">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              {...register("birthDate", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
            )}
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
              Apellidos del Tutor
            </label>
            <input
              {...register("apellidosTutor", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.apellidosTutor && (
              <p className="text-red-500 text-sm">
                {errors.apellidosTutor.message}
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
              className="w-full p-2 border rounded text-black"
            />
            {errors.telefonoTutor && (
              <p className="text-red-500 text-sm">
                {errors.telefonoTutor.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-semibold text-black">
              Registrado en el Sistema desde
            </label>
            <input
              type="date"
              {...register("inscritoDesde", {
                required: "Este campo es obligatorio",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.inscritoDesde && (
              <p className="text-red-500 text-sm">
                {errors.inscritoDesde.message}
              </p>
            )}
          </div>

          {isEdit && (
            <div>
              <label className="block font-semibold text-black">
                Clase Actual
              </label>
              <input
                value={studentData ? studentData.ClassId.name : ""}
                className="w-full p-2 border rounded text-black bg-gray-200 cursor-not-allowed"
                readOnly
              />
            </div>
          )}
          <div>
            <label className="block font-semibold text-black">
              Agregar o cambiar de clase
            </label>
            {loadingClasses ? (
              <p className="text-gray-500">Cargando clases...</p>
            ) : errorClasses ? (
              <p className="text-red-500">{errorClasses}</p>
            ) : (
              <select
                {...register("curso", {
                  required: isEdit
                    ? false
                    : { value: true, message: "Este campo es obligatorio" },
                  validate: (value) =>
                    value !== "none" || "Este campo es obligatorio",
                })}
                className="w-full p-2 border rounded text-black"
              >
                <option value="none">Seleccionar clase</option>
                {classes.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
            )}
            {errors.curso && (
              <p className="text-red-500 text-sm">{errors.curso.message}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold text-black">
              Historial de sus clases
            </label>
            <div className="space-y-2">
              {previousClasses.length > 0 ? (
                previousClasses.map((cls) => (
                  <div
                    key={cls._id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600 font-semibold">
                      {cls.name}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-black">
                  No hay cursos anteriores registrados.
                </p>
              )}
            </div>
          </div>

          {isEdit && (
            <div>
              <label className="block font-semibold text-black">
                Estatus del Alumno
              </label>
              <select
                {...register("estatus")}
                className="w-full p-2 border rounded text-black"
              >
                <option value="activo">activo</option>
                <option value="baja temporal">baja temporal</option>
                <option value="baja total">baja total</option>
                <option value="abandono voluntario">abandono voluntario</option>
                <option value="finalizacion de estudios">
                  finalizacion de estudios
                </option>
              </select>
            </div>
          )}
          <div>
            <label className="block font-semibold text-black">Genero</label>
            <select
              {...register("genero")}
              className="w-full p-2 border rounded text-black"
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-black">
              Condiciones Médicas (Opcional)
            </label>
            <input
              {...register("condicionesMedicas")}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block font-semibold text-black">
              Necesidades Especiales (Opcional)
            </label>
            <input
              {...register("necesidadesEspeciales")}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div className="flex flex-wrap justify-center sm:justify-between mt-4 gap-2">
            <button
              type="button"
              onClick={() => router.push("/alumnos")}
              className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-700 w-full sm:w-auto"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036] w-full sm:w-auto"
            >
              {isEdit ? "Actualizar Estudiante" : "Crear Estudiante"}
            </button>
            {isEdit && (
              <button
                type="button"
                onClick={() =>
                  router.push(`/formularioDeTransferencias?id=${id}`)
                }
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
              >
                Transferir
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
