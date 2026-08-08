import apiClient from "./api.client";

export const apiService = {
    getClients: async (params?: any) => {
        const response = await apiClient.get("/clients", { params });
        return response.data
    },
    createClient: async (data: any) => {
        const response = await apiClient.post("/clients", data);
        return response.data
    },
    updateClient: async (id: number, data: any) => {
        const response = await apiClient.put(`/clients/${id}`, data);
        return response.data
    },
}