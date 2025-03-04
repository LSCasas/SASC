import { toast } from "react-toastify";

const API_URL = "http://localhost:5000";

// DEVELOPMENT:  //http://localhost:5000
// TESTING: //http://localhost:5000

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
      toast.error(
        result.message || result.error || "Error creando la transferencia"
      );
      return null;
    }
    return result.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
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
      toast.error(
        result.message || result.error || "Error obteniendo las transferencias"
      );
      return null;
    }
    return result.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
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
      toast.error(
        result.message || result.error || "Error obteniendo la transferencia"
      );
      return null;
    }
    return result.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
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
      toast.error(
        result.message ||
          result.error ||
          "Error obteniendo las transferencias por sede"
      );
      return null;
    }
    return result.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
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
      toast.error(
        result.message || result.error || "Error actualizando la transferencia"
      );
      return null;
    }
    return result.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}
