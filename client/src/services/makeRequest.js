import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export function makeRequest(url, options) {
  return api(url, options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}
