import { makeRequest } from "./makeRequest";
export async function signIn(data) {
  return makeRequest("/api/user/login", { method: "POST", data });
}
