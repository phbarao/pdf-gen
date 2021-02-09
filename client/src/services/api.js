import { create } from "axios";

const api = create({
  baseURL: "http://localhost:5000",
});

export default api;
