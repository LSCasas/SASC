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
