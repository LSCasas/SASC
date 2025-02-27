const API_URL = "http://localhost:5000";

// CREATE A NEW INSTRUMENT
export async function createInstrument(data) {
  const res = await fetch(`${API_URL}/instrument`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

// GET ALL INSTRUMENT
export async function getAllInstruments() {
  const res = await fetch(`${API_URL}/instrument`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

// GET INSTRUMENT BY ID
export async function getInstrumentById(id) {
  const res = await fetch(`${API_URL}/instrument/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

// GET INSTRUMENT BY CAMPUS ID
export async function getInstrumentsByCampusId(campusId) {
  const res = await fetch(`${API_URL}/instrument/campus/${campusId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

// UPDATE INSTRUMENT BY ID
export async function updateInstrument(id, data) {
  const res = await fetch(`${API_URL}/instrument/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

// DELETE INSTRUMENT BY ID
export async function deleteInstrument(id) {
  const res = await fetch(`${API_URL}/instrument/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.message;
}
