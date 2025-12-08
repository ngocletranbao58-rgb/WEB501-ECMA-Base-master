import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
});
export const tourApi = {
    getAll: () => api.get("/tours").then((res) => res.data),
    getById: (id) => api.get(`/tours/${id}`).then((res) => res.data),
    create: (tour) => api.post("/tours", tour).then((res) => res.data),
    update: (id, data) => api.put(`/tours/${id}`, data).then((res) => res.data),
    delete: (id) => api.delete(`/tours/${id}`),
};

export default api;