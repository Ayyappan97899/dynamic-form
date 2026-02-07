import axios from "axios";
import type { User } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const userService = {
  getUsers: () => api.get<User[]>("/users").then((r) => r.data),
  createUser: (user: Omit<User, "id">) =>
    api.post<User>("/users", user).then((r) => r.data),
  updateUser: (id: string, user: Omit<User, "id">) =>
    api.put<User>(`/users/${id}`, user).then((r) => r.data),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
};
