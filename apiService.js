import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Change if deploying

// Auth functions
export const signup = async (userData) => {
  return axios.post(`${API_URL}/auth/signup`, userData);
};

export const login = async (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

// News functions
export const fetchNews = async () => {
  return axios.get(`${API_URL}/news`);
};
