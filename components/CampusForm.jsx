import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createCampus, updateCampus, getCampusById } from "../api/campus";
import { useRouter } from "next/router";

const CampusForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [campusData, setCampusData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      const fetchCampusData = async () => {
        setLoading(true);
        try {
          const data = await getCampusById(id);
          setCampusData(data);
          setValue("nombre", data.name);
          setValue("direccion", data.address);
          setValue("telefono_contacto", data.contactPhone);
          setValue("isAchive", data.isAchive ? "inactive" : "active");
        } catch (error) {
          console.error("Error al obtener los datos del campus:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCampusData();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const isAchive = data.isAchive === "inactive";

      const campusDataToSend = {
        name: data.nombre,
        address: data.direccion,
        contactPhone: data.telefono_contacto,
        isAchive,
      };

      if (id) {
        await updateCampus(id, campusDataToSend);
      } else {
        await createCampus(campusDataToSend);
      }
      router.push("/ControlDeSedes");
    } catch (error) {
      console.error("Error al guardar el campus:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold text-black">Nombre</label>
          <input
            {...register("nombre", { required: "Este campo es obligatorio" })}
            className="w-full p-2 border rounded text-black"
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
          {errors.telefono_contacto && (
            <p className="text-red-500 text-sm">
              {errors.telefono_contacto.message}
            </p>
          )}
        </div>

        {id && (
          <div>
            <label className="block font-semibold text-black">Estatus</label>
            <select
              {...register("isAchive")}
              className="w-full p-2 border rounded text-black"
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full sm:w-auto py-2 px-4 bg-gradient-to-r bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default CampusForm;
