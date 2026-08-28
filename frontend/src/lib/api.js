import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;
export const api = axios.create({ baseURL: API });

export const fetchSecteurs = () => api.get("/secteurs").then(r => r.data);
export const fetchMetiers = (params = {}) => api.get("/metiers", { params }).then(r => r.data);
export const fetchMetier = (slug) => api.get(`/metiers/${slug}`).then(r => r.data);
export const fetchReference = (key) => api.get(`/reference/${key}`).then(r => r.data);
export const fetchSimPreview = (params) => api.get("/simulation/preview", { params }).then(r => r.data);
export const fetchRessources = () => api.get("/ressources").then(r => r.data);
