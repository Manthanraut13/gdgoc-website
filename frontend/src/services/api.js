import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// EVENTS
export const getEvents = (params = {}) =>
  api.get("/events", { params });

export const getEventById = (id) =>
  api.get(`/events/${id}`);

// BLOGS
export const getBlogs = (params = {}) =>
  api.get("/blogs", { params });

export const getBlogById = (id) =>
  api.get(`/blogs/${id}`);

// CONTACT
export const submitContactForm = (data) =>
  api.post("/contact", data);

// JOIN US
export const submitJoinApplication = (data) =>
  api.post("/join", data);

export default api;
