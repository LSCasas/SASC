const API_URL = "http://localhost:5000";

// CREATE TUTOR
export async function createTutor(data) {
  const res = await fetch(`${API_URL}/tutors`, {
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
