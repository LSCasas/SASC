import { toast } from "react-toastify";

const API_URL = "https://sasc-api-2.onrender.com";

// DEVELOPMENT:  //http://localhost:5000
// TESTING: //https://sasc-api-2.onrender.com

// CREATE STUDENT
export async function createStudent(data) {
  try {
    const res = await fetch(`${API_URL}/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();

    if (!res.ok) {
      toast.error(
        json.message || json.error || "Error desconocido al crear el estudiante"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET ALL STUDENTS
export async function getAllStudents() {
  try {
    const res = await fetch(`${API_URL}/student`, {
      method: "GET",
      credentials: "include",
    });

    const json = await res.json();
    if (!res.ok) {
      toast.error(
        json.message ||
          json.error ||
          "Error desconocido al obtener los estudiantes"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET STUDENT BY ID
export async function getStudentById(studentId) {
  try {
    const res = await fetch(`${API_URL}/student/${studentId}`, {
      method: "GET",
      credentials: "include",
    });

    const json = await res.json();
    if (!res.ok) {
      toast.error(
        json.message ||
          json.error ||
          "Error desconocido al obtener el estudiante"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// GET STUDENTS BY CAMPUS ID
export async function getStudentsByCampusId(campusId) {
  try {
    const res = await fetch(`${API_URL}/student/campus/${campusId}`, {
      method: "GET",
      credentials: "include",
    });

    const json = await res.json();
    if (!res.ok) {
      if (json.error && json.error.includes("No students found")) {
        toast.info("No se encontraron estudiantes para este campus");
        return [];
      }
      toast.error(
        json.message ||
          json.error ||
          "Error desconocido al obtener los estudiantes del campus"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}

// UPDATE STUDENT
export async function updateStudent(studentId, data) {
  try {
    const res = await fetch(`${API_URL}/student/${studentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();

    if (!res.ok) {
      toast.error(
        json.message ||
          json.error ||
          "Error desconocido al actualizar el estudiante"
      );
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error al procesar la solicitud");
    return null;
  }
}
