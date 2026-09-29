import { API_BASE_URL } from "./apiConfig";

// GET students
export const getStudents = async () => {
  const response = await fetch(`${API_BASE_URL}/students`);
  return response.json();
};

// POST student
export const addStudent = async (student) => {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  });

  return response.json();
};

// PUT student
export const updateStudent = async (id, student) => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  });

  return response.json();
};

// DELETE student
export const deleteStudent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "DELETE"
  });

  return response.json();
};