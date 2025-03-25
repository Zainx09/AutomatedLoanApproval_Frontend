import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Flask API URL
});

export const predictLoan = (data) =>
  api.post("/predict", data).then((response) => response.data);

export const generatePDF = (data) =>
  api
    .post("/generatePDF", data, { responseType: "blob" })
    .then((response) => response.data);

export const getAdminUsers = () =>
  api.get("/admin/users").then((response) => response.data);

export const predictLoanById = (applicantId) =>
  api.get(`/predict/${applicantId}`).then((response) => response.data);
