const API_URL = "http://localhost:5000";

// CREATE TRANSFER
export async function createTransfer(data) {
  try {
    const response = await fetch(`${API_URL}/transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error creando la transferencia");
    }

    return result.data;
  } catch (error) {
    console.error("Error en crear transferencia:", error);
    throw error;
  }
}

// GET ALL TRANSFERS
export async function getAllTransfers() {
  try {
    const response = await fetch(`${API_URL}/transfer`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error obteniendo las transferencias");
    }

    return result.data;
  } catch (error) {
    console.error("Error obteniendo todas las transferencias:", error);
    throw error;
  }
}
