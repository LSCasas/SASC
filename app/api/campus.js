const API_URL = "http://localhost:5000";

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
    if (!response.ok) throw new Error(data.message || "Error al crear campus");

    return data.data;
  } catch (error) {
    console.error("Error en createCampus:", error);
    throw error;
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
    if (!response.ok)
      throw new Error(data.message || "Error al obtener campuses");

    return data.data;
  } catch (error) {
    console.error("Error en getAllCampuses:", error);
    throw error;
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
    if (!response.ok)
      throw new Error(data.message || "Error al obtener campus");

    return data.data;
  } catch (error) {
    console.error("Error en getCampusById:", error);
    throw error;
  }
}
