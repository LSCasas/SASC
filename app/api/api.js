const API_URL = "http://localhost:5000";

// LOGIN
export async function login(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

// SELECTED SEDE
export async function selectCampus(token, selectedCampusId) {
  const res = await fetch(`${API_URL}/auth/select-campus`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ selectedCampusId }),
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}
