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

// GET TRANSFER BY ID
export async function getTransferById(id) {
  try {
    const response = await fetch(`${API_URL}/transfer/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error obteniendo la transferencia");
    }

    return result.data;
  } catch (error) {
    console.error("Error obteniendo la transferencia por ID:", error);
    throw error;
  }
}

// GET TRANSFERS BY CAMPUS ID
export async function getTransfersByCampusId(campusId) {
  try {
    const response = await fetch(`${API_URL}/transfer/campus/${campusId}`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Error obteniendo las transferencias por sede"
      );
    }

    return result.data;
  } catch (error) {
    console.error("Error obteniendo transferencias por sede:", error);
    throw error;
  }
}

// UPDATE TRANSFER
export async function updateTransfer(id, data) {
  try {
    const response = await fetch(`${API_URL}/transfer/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error actualizando la transferencia");
    }

    return result.data;
  } catch (error) {
    console.error("Error actualizando la transferencia:", error);
    throw error;
  }
}
