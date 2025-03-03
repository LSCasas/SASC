import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createUser, updateUser, getUserById } from "../api/user";
import { getAllCampuses } from "../api/campus";

const CoordinatorForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [campuses, setCampuses] = useState([]);
  const [assignedCampuses, setAssignedCampuses] = useState([]);
  const [removedCampuses, setRemovedCampuses] = useState([]);
  const [loadingCampuses, setLoadingCampuses] = useState(true);
  const [errorCampuses, setErrorCampuses] = useState(null);
  const [role, setRole] = useState("coordinator");
  const [isArchived, setisArchived] = useState("false");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchCampuses() {
      try {
        let campusesData = await getAllCampuses();
        const activeCampuses = campusesData.filter(
          (campus) => campus.isAchive === false
        );
        setCampuses(activeCampuses);
      } catch (err) {
        setErrorCampuses("Error al obtener las sedes");
      } finally {
        setLoadingCampuses(false);
      }
    }
    fetchCampuses();
  }, []);

  useEffect(() => {
    if (!id) return;

    setIsEdit(true);
    async function fetchUser() {
      try {
        const userData = await getUserById(id);
        setValue("firstName", userData.firstName);
        setValue("lastName", userData.lastName);
        setValue("email", userData.email);
        setValue("phone", userData.phone);
        setAssignedCampuses(userData.campusId || []);
        setRole(userData.role);
        setisArchived(userData.isArchived || "false");
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      }
    }
    fetchUser();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        delete data.password;
      }

      var finalcampusId = isEdit
        ? [
            ...assignedCampuses.map((campus) => campus._id),
            ...removedCampuses.map((campusId) => `-${campusId}`),
          ]
        : assignedCampuses.map((campus) => campus._id);

      const userData = {
        ...data,
        campusId: finalcampusId,
        role,
        isArchived,
      };

      if (role === "admin") {
        userData.adminType = "second";
      }

      if (isEdit) {
        await updateUser(id, userData);
      } else {
        await createUser(userData);
      }

      router.push("/coordinadores");
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleAddCampus = (event) => {
    const selectedCampusId = event.target.value;
    if (!selectedCampusId) return;

    const selectedCampus = campuses.find((c) => c._id === selectedCampusId);
    if (selectedCampus) {
      setAssignedCampuses([...assignedCampuses, selectedCampus]);
      setRemovedCampuses(
        removedCampuses.filter((id) => id !== selectedCampusId)
      );
    }
  };

  const handleRemoveCampus = (campusId) => {
    if (assignedCampuses.some((campus) => campus._id === campusId)) {
      setAssignedCampuses(
        assignedCampuses.filter((campus) => campus._id !== campusId)
      );
      setRemovedCampuses([...removedCampuses, campusId]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="h-[75vh] overflow-y-auto p-2">
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
            <label className="block font-semibold text-black">Apellido</label>
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
            <label className="block font-semibold text-black">Teléfono</label>
            <input
              {...register("phone", { required: "Este campo es obligatorio" })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">Email</label>
            <input
              {...register("email", { required: "Este campo es obligatorio" })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {!isEdit && (
            <div>
              <label className="block font-semibold text-black">
                Contraseña
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full p-2 border rounded text-black"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block font-semibold text-black">Permisos</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded text-black"
            >
              <option value="coordinator">Coordinador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {isEdit && (
            <div>
              <label className="block font-semibold text-black">Estatus</label>
              <select
                value={isArchived}
                onChange={(e) => setisArchived(e.target.value)}
                className="w-full p-2 border rounded text-black"
              >
                <option value="false">Activo</option>
                <option value="true">Baja</option>
              </select>
            </div>
          )}

          <div>
            <label className="block font-semibold text-black">
              Sedes asignadas
            </label>
            {role === "admin" ? (
              <p className="text-gray-500">
                Todas las sedes actuales y futuras serán asignadas a este
                perfil.
              </p>
            ) : loadingCampuses ? (
              <p className="text-gray-500">Cargando sedes...</p>
            ) : errorCampuses ? (
              <p className="text-red-500">{errorCampuses}</p>
            ) : (
              <div className="space-y-2">
                {assignedCampuses.map((campus) => (
                  <div
                    key={campus._id}
                    className="flex justify-between items-center p-2 border rounded text-black"
                  >
                    <span>{campus.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCampus(campus._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold text-black">
              Asignar Sede
            </label>
            <select
              onChange={handleAddCampus}
              className="w-full p-2 border rounded text-black"
            >
              <option value="">Selecciona una sede</option>
              {campuses
                .filter(
                  (campus) =>
                    !assignedCampuses.some((ac) => ac._id === campus._id)
                )
                .map((campus) => (
                  <option key={campus._id} value={campus._id}>
                    {campus.name}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
          >
            {isEdit ? "Actualizar Usuario" : "Crear Usuario"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoordinatorForm;
