import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
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
    }
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/auth/register', {
      email: userData.email,
      full_name: userData.name,
      password: userData.password
    });
    return response.data;
  },

  logout() {
    localStorage.removeItem('agro_token');
  }
};

export default api;