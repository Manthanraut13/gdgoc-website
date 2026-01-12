import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===========================
   AUTH TOKEN ATTACH
=========================== */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});



/* ===========================
   EVENTS (Public + Admin)
=========================== */

// Public
export const getEvents = (params = {}) => api.get("/events", { params });
export const getEventById = (id) => api.get(`/events/${id}`);

// Admin
export const createEvent = (data) => api.post("/events", data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);


/* ===========================
   BLOGS (Public + Admin)
=========================== */

// Public
export const getBlogs = (params = {}) => api.get("/blogs", { params });
export const getBlogById = (id) => api.get(`/blogs/${id}`);

// Admin
export const createBlog = (data) => api.post("/blogs", data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);


/* ===========================
   PROJECTS (Public + Admin)
=========================== */

// Public
export const getProjects = (params = {}) => api.get("/projects", { params });
export const getProjectById = (id) => api.get(`/projects/${id}`);

// Admin
export const createProject = (data) => api.post("/projects", data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);


/* ===========================
   RESOURCES (Public + Admin)
=========================== */

// Public
export const getResources = (params = {}) => api.get("/resources", { params });
export const getResourceById = (id) => api.get(`/resources/${id}`);

// Admin
export const createResource = (data) => api.post("/resources", data);
export const updateResource = (id, data) => api.put(`/resources/${id}`, data);
export const deleteResource = (id) => api.delete(`/resources/${id}`);


/* ===========================
   CONTACT (Public + Admin)
=========================== */

// Public contact form
export const submitContactForm = (data) => api.post("/contact", data);

// Admin
export const getContacts = () => api.get("/contact");
export const deleteContact = (id) => api.delete(`/contact/${id}`);


/* ===========================
   JOIN US (Public + Admin)
=========================== */

// Public
export const submitJoinApplication = (data) => api.post("/join", data);

// Admin
export const getJoinApplications = () => api.get("/join");
export const deleteJoin = (id) => api.delete(`/join/${id}`);


/* ===========================
   AUTH
=========================== */

export const adminLogin = (data) => api.post("/admin/login", data);

export default api;
