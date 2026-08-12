import apiClient from "./api.client";

export const apiService = {
  getClients: async (params?: any) => {
    const response = await apiClient.get("/clients", { params });
    return response.data;
  },
  createClient: async (data: any) => {
    const response = await apiClient.post("/clients", data);
    return response.data;
  },
  updateClient: async (id: number, data: any) => {
    const response = await apiClient.put(`/clients/${id}`, data);
    return response.data;
  },
  patchClient: async (id: number, data: any) => {
    const response = await apiClient.patch(`/clients/${id}`, data);
    return response.data;
  },
  deleteClient: async (id: number) => {
    const response = await apiClient.delete(`/clients/${id}`);
    return response.data;
  },
  getClientContacts: async (client_id: number) => {
    const response = await apiClient.get(`/clients/${client_id}`);
    return response.data;
  },
  createContact: async (client_id: number, data: any) => {
    const response = await apiClient.post(
      `/clients/${client_id}/contacts`,
      data,
    );
    return response.data;
  },
  updateContact: async (id: number, data: any) => {
    const response = await apiClient.put(`/contacts/${id}`, data);
    return response.data;
  },
  deleteContact: async (id: number) => {
    const response = await apiClient.delete(`/contacts/${id}`);
    return response.data;
  },
  getDashboard: async () => {
    const response = await apiClient.get("/dashboard");
    return response.data;
  },
};
