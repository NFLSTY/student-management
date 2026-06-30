//
// API SERVICE
// Centralized API configuration
//
import axios from 'axios';

//
// BASE CONFIGURATION
//
const API_URL = 'http://localhost:3000';
// NestJS backend URL
export const api = axios.create({
  baseURL: API_URL,
  // All requests prepend this URL
  // api.get('/students') → http://localhost:3000/students
  headers: {
    'Content-Type': 'application/json',
  },
  // Default headers for all requests
  timeout: 10000,
  // Timeout after 10 seconds
});

//
// STUDENT API METHODS
//
export const studentsApi = {
  // GET all students
  getAll: () => api.get('/students'),
  // Returns: Promise<AxiosResponse<Student[]>>
  // GET one student
  getById: (id: string) => api.get(`/students/${id}`),
  // Template literal for dynamic URL
  // POST create student
  create: (student: unknown) => api.post('/students', student),
  // Second param = request body
  // PATCH update student
  update: (id: string, student: unknown) => api.patch(`/students/${id}`, student),
  // Can also use PUT
  // DELETE student
  delete: (id: string) => api.delete(`/students/${id}`),
};
