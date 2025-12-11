import api from "./axiosClient";

export const getAttempts = () => api.get("/phishing");

export const createAttempt = (email: string, message: string) =>
  api.post("/phishing/create", { email, message });

export const sendAttempt = (id: string) =>
  api.post(`/phishing/send/${id}`);
