const API_URL = "http://localhost:5000";

// CREATE CAMPUS
export async function createCampus(campusData) {
  try {
    const response = await fetch(`${API_URL}/campuses`, {
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
