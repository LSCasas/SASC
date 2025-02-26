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

// GET ALL TUTORS
export async function getAllTutors() {
  const res = await fetch(`${API_URL}/tutors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

// GET TUTOR BY ID
export async function getTutorById(tutorId) {
  const res = await fetch(`${API_URL}/tutors/${tutorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

// UPDATE TUTOR
export async function updateTutor(tutorId, data) {
  const res = await fetch(`${API_URL}/tutors/${tutorId}`, {
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
}

// DELETE TUTOR
export async function deleteTutor(tutorId) {
  const res = await fetch(`${API_URL}/tutors/${tutorId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.message;
}
