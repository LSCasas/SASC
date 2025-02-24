const API_URL = "http://localhost:5000";

// CREATE A NEW CLASS
export async function createClass(data) {
  const res = await fetch(`${API_URL}/class`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Error creando clase");
  return json.data;
}

// GET ALL CLASSES
export async function getAllClasses() {
  const res = await fetch(`${API_URL}/class`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Error obteniendo clases");
  return json.data;
}

// GET CLASS BY ID
export async function getClassById(classId) {
  const res = await fetch(`${API_URL}/class/${classId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Error obteniendo clase");
  return json.data;
}

// GET CLASSES BY CAMPUS ID
export async function getClassesByCampusId(campusId) {
  const res = await fetch(`${API_URL}/class/campus/${campusId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success)
    throw new Error(json.error || "Error obteniendo clases del campus");
  return json.data;
}
