import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Flask API URL
  validateStatus: function (status) {
    return status >= 200 && status < 300; // Only resolve for 2xx statuses, reject others (e.g., 500)
  },
});

export const updateApplication = (data) => 
  api.put("/api/application", data).then((response) => response.data);

export const setApplication = (data) =>
  api.post("/api/application", data).then((response) => response.data);

export const predictLoan = (data) =>
  api.post("/predict", data).then((response) => response.data);

export const generatePDF = (data) =>
  api
    .post("/generatePDF", data, { responseType: "blob" })
    .then((response) => response.data);

export const getAdminUsers = () =>
  api.get("/admin/users").then((response) => response.data);

export const getAdminApplications = () =>
  api.get("/admin/applications").then((response) => response.data);

export const predictLoanById = (applicantId) =>
  api.get(`/predict/${applicantId}`).then((response) => response.data);
