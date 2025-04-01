import { toast } from "react-toastify";

const API_URL = "http://localhost:5000";

// DEVELOPMENT:  //http://localhost:5000
// TESTING: //https://sasc-api-2.onrender.com

// CREATE TUTOR
export async function createTutor(data) {
  try {
    const res = await fetch(`${API_URL}/tutor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.message || json.error || "Error al crear tutor");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET ALL TUTORS
export async function getAllTutors() {
  try {
    const res = await fetch(`${API_URL}/tutor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.message || json.error || "Error al obtener tutores");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET TUTOR BY ID
export async function getTutorById(tutorId) {
  try {
    const res = await fetch(`${API_URL}/tutor/${tutorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.message || json.error || "Error al obtener tutor");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET TUTORS BY CAMPUS ID
export async function getTutorsByCampusId(campusId) {
  try {
    const res = await fetch(`${API_URL}/tutor/campus/${campusId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(
        json.message || json.error || "Error al obtener tutores por sede"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// UPDATE TUTOR
export async function updateTutor(tutorId, data) {
  try {
    const res = await fetch(`${API_URL}/tutor/${tutorId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.message || json.error || "Error al actualizar tutor");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}
