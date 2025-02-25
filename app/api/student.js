const API_URL = "http://localhost:5000";

// CREATE STUDENT
export async function createStudent(data) {
  try {
    const res = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(
        json.message || "Error desconocido al crear el estudiante"
      );
    }
    return json.data;
  } catch (error) {
    console.error("Error creando el estudiante:", error);
    throw error;
  }
}

// GET ALL STUDENTS
export async function getAllStudents() {
  try {
    const res = await fetch(`${API_URL}/students`, {
      method: "GET",
      credentials: "include",
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(
        json.message || "Error desconocido al obtener los estudiantes"
      );
    }
    return json.data;
  } catch (error) {
    console.error("Error obteniendo los estudiantes:", error);
    throw error;
  }
}

// GET STUDENT BY ID
export async function getStudentById(studentId) {
  try {
    const res = await fetch(`${API_URL}/students/${studentId}`, {
      method: "GET",
      credentials: "include",
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(
        json.message || "Error desconocido al obtener el estudiante"
      );
    }
    return json.data;
  } catch (error) {
    console.error("Error obteniendo el estudiante:", error);
    throw error;
  }
}

// GET STUDENTS BY CAMPUS ID
export async function getStudentsByCampusId(campusId) {
  try {
    const res = await fetch(`${API_URL}/students/campus/${campusId}`, {
      method: "GET",
      credentials: "include",
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(
        json.message ||
          "Error desconocido al obtener los estudiantes del campus"
      );
    }
    return json.data;
  } catch (error) {
    console.error("Error obteniendo estudiantes por campus:", error);
    throw error;
  }
}
