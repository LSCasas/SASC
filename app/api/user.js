import { toast } from "react-toastify";

const API_URL = "http://localhost:5000";

export async function createUser(data) {
  try {
    const res = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      toast.error(json.error || "Error creando usuario");
      return null;
    }
    return json.data;
  } catch (error) {
    toast.error(error.message || "Error creando usuario");
    return null;
  }
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

// GET CURRENT USER
export async function getCurrentUser(userId = "me") {
  try {
    const res = await fetch(`${API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();

    if (!json.success) {
      if (json.error === "JWT is required") {
        localStorage.setItem("loginError", json.error);
        window.location.href = "/InicioDeSesion";
        return;
      }
      toast.error(json.error || "Error obteniendo usuario");
      return null;
    }

    return json.data;
  } catch (error) {
    toast.error(error.message || "Error obteniendo usuario");
    return null;
  }
}

export async function AuthUser(userId = "me") {
  try {
    const res = await fetch(`${API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      console.warn(`Error ${res.status}: ${res.statusText}`);
      return null;
    }

    let json;
    try {
      json = await res.json();
    } catch (error) {
      console.error("Error al parsear JSON de la respuesta:", error);
      return null;
    }

    if (!json.success) {
      console.warn("Respuesta no exitosa:", json.error || "Error desconocido");
      return null;
    }

    return json.data;
  } catch (error) {
    console.error("Error en AuthUser:", error.message);
    return null;
  }
}

// GET USER BY ID
export async function getUserById(userId) {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
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
