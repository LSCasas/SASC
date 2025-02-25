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
