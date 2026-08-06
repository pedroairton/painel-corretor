import apiClient from "./api.client";

export const apiService = {
    getClients: async () => {
        const response = await apiClient.get("/clients");
        return response.data
    }
}