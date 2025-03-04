const API_URL = "https://sasc-api-2.onrender.com";

// DEVELOPMENT:  //http://localhost:5000
// TESTING: //https://sasc-api-2.onrender.com

// CREATE TUTOR
export async function createTutor(data) {
  const res = await fetch(`${API_URL}/tutor`, {
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
  const res = await fetch(`${API_URL}/tutor`, {
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
  const res = await fetch(`${API_URL}/tutor/${tutorId}`, {
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

// GET TUTORS BY CAMPUS ID
export async function getTutorsByCampusId(campusId) {
  const res = await fetch(`${API_URL}/tutor/campus/${campusId}`, {
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
  const res = await fetch(`${API_URL}/tutor/${tutorId}`, {
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
  const res = await fetch(`${API_URL}/tutor/${tutorId}`, {
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
