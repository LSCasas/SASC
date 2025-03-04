import { toast } from "react-toastify";

const API_URL = "https://sasc-api-2.onrender.com";

// CREATE TEACHER
export async function createTeacher(data) {
  try {
    const res = await fetch(`${API_URL}/teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.error || json.error || "Error creando docente");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET ALL TEACHERS
export async function getAllTeachers() {
  try {
    const res = await fetch(`${API_URL}/teacher`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.error || json.error || "Error obteniendo los docentes");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET TEACHER BY ID
export async function getTeacherById(id) {
  try {
    const res = await fetch(`${API_URL}/teacher/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(
        json.error || json.error || "Error obteniendo docente por ID"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET TEACHERS BY CAMPUS ID
export async function getTeachersByCampusId(campusId) {
  try {
    const res = await fetch(`${API_URL}/teacher/campus/${campusId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(
        json.error || json.error || "Error obteniendo docentes por campus ID"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// UPDATE TEACHER
export async function updateTeacher(id, data) {
  try {
    const res = await fetch(`${API_URL}/teacher/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.error || json.error || "Error actualizando docente");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}
