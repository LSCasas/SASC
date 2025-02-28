const API_URL = "http://localhost:5000";

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
export async function getCurrentUser(userId = "me") {
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

// GET USER BY ID
export async function getUserById(userId) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error fetching user by ID");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
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
