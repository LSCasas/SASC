const API_URL = "http://localhost:5000";

// CREATE TEACHER
export async function createTeacher(data) {
  try {
    const { selectedCampusId, userId } = data; // Asume que el ID del campus y el usuario vienen del front end o del contexto
    const res = await fetch(`${API_URL}/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (error) {
    console.error("Error creando docente:", error);
    throw error;
  }
}

// GET ALL TEACHERS
export async function getAllTeachers() {
  try {
    const res = await fetch(`${API_URL}/teachers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (error) {
    console.error("Error obteniendo todos los docentes:", error);
    throw error;
  }
}

// GET TEACHER BY ID
export async function getTeacherById(id) {
  try {
    const res = await fetch(`${API_URL}/teachers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (error) {
    console.error("Error obteniendo docente por ID:", error);
    throw error;
  }
}

// GET TEACHERS BY CAMPUS ID
export async function getTeachersByCampusId(campusId) {
  try {
    const res = await fetch(`${API_URL}/teacher/campus/${campusId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (error) {
    console.error("Error obteniendo docentes por campus ID:", error);
    throw error;
  }
}

// UPDATE TEACHER
export async function updateTeacher(id, data) {
  try {
    const res = await fetch(`${API_URL}/teachers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (error) {
    console.error("Error actualizando docente:", error);
    throw error;
  }
}
