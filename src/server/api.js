import Api from "axios";

const api = Api.create({
  baseURL: "https://api.github.com"
});

export default api;
