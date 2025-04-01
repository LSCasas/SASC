import { toast } from "react-toastify";

const API_URL = "http://localhost:5000";

// DEVELOPMENT:  //http://localhost:5000
// TESTING: //https://sasc-api-2.onrender.com

// CREATE STAFF
export async function createStaff(data) {
  try {
    const res = await fetch(`${API_URL}/staff`, {
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

// GET ALL STAFF
export async function getAllStaffs() {
  try {
    const res = await fetch(`${API_URL}/staff`, {
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

// GET STAFF BY ID
export async function getStaffById(id) {
  try {
    const res = await fetch(`${API_URL}/staff/${id}`, {
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

// GET STAFF BY CAMPUS ID
export async function getStaffsByCampusId(campusId) {
  try {
    const res = await fetch(`${API_URL}/staff/campus/${campusId}`, {
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

// UPDATE STAFF
export async function updateStaff(id, data) {
  try {
    const res = await fetch(`${API_URL}/staff/${id}`, {
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
