import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('agro_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(email, password) {
    // FastAPI expects form-data for OAuth2 compatibility
    const formData = new FormData();
    formData.append('username', email); // FastAPI uses username field
    formData.append('password', password);
    
    const response = await api.post('/auth/login', formData);
    if (response.data.access_token) {
      localStorage.setItem('agro_token', response.data.access_token);
      localStorage.setItem('agro_user', JSON.stringify({ name: response.data.user_name, email: email}));
    }
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/auth/signup', {
      email: userData.email,
      name: userData.name,
      password: userData.password
    });
    return response.data;
  },

  logout() {
    localStorage.removeItem('agro_token');
  }
};

export const agendaService = {
  async getTodayAppointments() {
    const today = new Date().toISOString().split('T')[0];
    const response = await api.get(`/appointments/?date=${today}`);
    return response.data;
  },
  async getClients() {
    const response = await api.get('/clients/');
    return response.data;
  },
  async getServices() {
    const response = await api.get('/services/');
    return response.data;
  },
  async createClient(data) {
    const response = await api.post('/clients/', data);
    return response.data;
  },
  async updateClient(id, data) {
    const response = await api.put(`/clients/${id}`, data);
    return response.data;
  },
  async createAppointment(data) {
    const response = await api.post('/appointments/', data);
    return response.data;
  },
  async updateAppointment(id, data) {
    const response = await api.put(`/appointments/${id}`, data);
    return response.data;
  },
  async createService(data) {
    const response = await api.post('/services/', data);
    return response.data;
  },
  async updateService(id, data) {
    const response = await api.put(`/services/${id}`, data);
    return response.data;
  },
  async deleteClient(id) {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  },
  async deleteService(id) {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
  async deleteAppointment(id) {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  }
};

export default api;