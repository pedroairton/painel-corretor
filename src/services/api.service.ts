import apiClient from "./api.client";

export const apiService = {
    getClients: async (params?: any) => {
        const response = await apiClient.get("/clients", { params });
        return response.data
    }
}