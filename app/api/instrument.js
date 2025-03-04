import { toast } from "react-toastify";

const API_URL = "https://sasc-api-2.onrender.com";

// DEVELOPMENT:  //http://localhost:5000
// TESTING: //http://localhost:5000

// CREATE A NEW INSTRUMENT
export async function createInstrument(data) {
  try {
    const res = await fetch(`${API_URL}/instrument`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.error || json.error || "Error creando el instrumento");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET ALL INSTRUMENTS
export async function getAllInstruments() {
  try {
    const res = await fetch(`${API_URL}/instrument`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(
        json.error || json.error || "Error obteniendo los instrumentos"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET INSTRUMENT BY ID
export async function getInstrumentById(id) {
  try {
    const res = await fetch(`${API_URL}/instrument/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(
        json.error || json.error || "Error obteniendo el instrumento"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET INSTRUMENT BY CAMPUS ID
export async function getInstrumentsByCampusId(campusId) {
  try {
    const res = await fetch(`${API_URL}/instrument/campus/${campusId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(
        json.error || json.error || "Error obteniendo los instrumentos por sede"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// UPDATE INSTRUMENT BY ID
export async function updateInstrument(id, data) {
  try {
    const res = await fetch(`${API_URL}/instrument/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(
        json.error || json.error || "Error actualizando el instrumento"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}
