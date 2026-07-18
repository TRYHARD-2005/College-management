import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const login = (data) => API.post('/api/auth/login', data);

export const getNotices = () => API.get('/api/notices');
export const getAllNotices = () => API.get('/api/notices/all');
export const createNotice = (d) => API.post('/api/notices', d);
export const updateNotice = (id, d) => API.put(`/api/notices/${id}`, d);
export const deleteNotice = (id) => API.delete(`/api/notices/${id}`);

export const getCourses = () => API.get('/api/courses');
export const getAllCourses = () => API.get('/api/courses/all');
export const createCourse = (d) => API.post('/api/courses', d);
export const updateCourse = (id, d) => API.put(`/api/courses/${id}`, d);
export const deleteCourse = (id) => API.delete(`/api/courses/${id}`);

export const getFaculty = () => API.get('/api/faculty');
export const getAllFaculty = () => API.get('/api/faculty/all');
export const createFaculty = (d) => API.post('/api/faculty', d);
export const updateFaculty = (id, d) => API.put(`/api/faculty/${id}`, d);
export const deleteFaculty = (id) => API.delete(`/api/faculty/${id}`);

export const getStudents = () => API.get('/api/students');
export const createStudent = (d) => API.post('/api/students', d);
export const updateStudent = (id, d) => API.put(`/api/students/${id}`, d);
export const deleteStudent = (id) => API.delete(`/api/students/${id}`);

export const submitAdmission = (d) => API.post('/api/admissions', d);
export const getAdmissions = () => API.get('/api/admissions');
export const updateAdmission = (id, d) => API.patch(`/api/admissions/${id}`, d);
export const deleteAdmission = (id) => API.delete(`/api/admissions/${id}`);

export const submitContact = (d) => API.post('/api/contact', d);

export const getStats = () => API.get('/api/stats');
