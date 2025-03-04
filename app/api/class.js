import { toast } from "react-toastify";

const API_URL = "http://localhost:5000";

// DEVELOPMENT:  //http://localhost:5000
// TESTING: //http://localhost:5000

// CREATE A NEW CLASS
export async function createClass(data) {
  try {
    const res = await fetch(`${API_URL}/class`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.error || json.error || "Error creando clase");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET ALL CLASSES
export async function getAllClasses() {
  try {
    const res = await fetch(`${API_URL}/class`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.error || json.error || "Error obteniendo clases");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET CLASS BY ID
export async function getClassById(classId) {
  try {
    const res = await fetch(`${API_URL}/class/${classId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.error || json.error || "Error obteniendo clase");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET CLASSES BY CAMPUS ID
export async function getClassesByCampusId(campusId) {
  try {
    const res = await fetch(`${API_URL}/class/campus/${campusId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(
        json.error || json.error || "Error obteniendo clases del campus"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// UPDATE CLASS BY ID
export async function updateClass(classId, data) {
  try {
    const res = await fetch(`${API_URL}/class/${classId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.error || json.error || "Error actualizando clase");
      return null;
    }
    toast.success("Clase actualizada correctamente");
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}
