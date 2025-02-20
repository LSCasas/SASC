const API_URL = "http://localhost:5000";

// LOGIN
export async function login(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
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
}

// SELECTED SEDE
export async function selectCampus(campusId) {
  try {
    const response = await fetch(`${API_URL}/auth/select-campus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ selectedCampusId: campusId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error desconocido en selectCampus");
    }

    return data.data;
  } catch (error) {
    console.error("Error en la respuesta de selectCampus:", error);
    throw error;
  }
}

// CREATE A NEW USER
export async function createUser(data) {
  const res = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Error creando usuario");
  return json.data;
}

// GET ALL users
export async function getAllUsers() {
  const res = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Error obteniendo usuarios");
  return json.data;
}

// GET USER BY ID
export async function getUserById(userId = "me") {
  const res = await fetch(`${API_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Error obteniendo usuario");
  return json.data;
}

// UPDATE USER BY ID
export async function updateUser(userId, data) {
  const res = await fetch(`${API_URL}/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success)
    throw new Error(json.error || "Error actualizando usuario");
  return json.data;
}

// CREATE TEACHER
export async function createTeacher(data) {
  try {
    const { selectedCampusId, userId } = data; // Asume que el ID del campus y el usuario vienen del front end o del contexto
    const res = await fetch(`${API_URL}/teacher`, {
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

// GET ALL teacher
export async function getAllteacher() {
  try {
    const res = await fetch(`${API_URL}/teacher`, {
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
    const res = await fetch(`${API_URL}/teacher/${id}`, {
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

// GET teacher BY CAMPUS ID
export async function getteacherByCampusId(campusId) {
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
    const res = await fetch(`${API_URL}/teacher/${id}`, {
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
