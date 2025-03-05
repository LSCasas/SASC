import { toast } from "react-toastify";

const API_URL = "https://sasc-api-2.onrender.com";

// DEVELOPMENT:  //http://localhost:5000
// TESTING: //https://sasc-api-2.onrender.com

// CREATE CAMPUS
export async function createCampus(campusData) {
  try {
    const response = await fetch(`${API_URL}/campus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(campusData),
    });

    const data = await response.json();
    if (!data.success) {
      toast.error(data.message || json.error || "Error al crear campus");
      return null;
    }

    return data.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET ALL CAMPUSES
export async function getAllCampuses() {
  try {
    const response = await fetch(`${API_URL}/campus`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!data.success) {
      toast.error(data.message || json.error || "Error al obtener campuses");
      return null;
    }

    return data.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET CAMPUS BY ID
export async function getCampusById(campusId) {
  try {
    const response = await fetch(`${API_URL}/campus/${campusId}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!data.success) {
      toast.error(data.message || json.error || "Error al obtener campus");
      return null;
    }

    return data.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// UPDATE CAMPUS
export async function updateCampus(campusId, campusData) {
  try {
    const response = await fetch(`${API_URL}/campus/${campusId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(campusData),
    });

    const data = await response.json();
    if (!data.success) {
      toast.error(data.message || json.error || "Error al actualizar campus");
      return null;
    }

    return data.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}
