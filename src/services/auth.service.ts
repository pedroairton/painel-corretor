import apiClient from "./api.client";

export const authService = {
    login: async (email: string, password: string) => {
        const response = await apiClient.post("/auth/login", { email, password });
        return response.data
    },
    logout: async () => {
        const response = await apiClient.post("/auth/logout");
        return response.data
    },
    me: async () => {
        const response = await apiClient.get("/user");
        return response.data
    },
}