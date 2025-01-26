import { baseUrl } from '@/app/config/config';
import axios from 'axios';

interface Data {
  email: string;
  password: string;
}

// Function for handling login request
export const loginUser = async (data: Data) => {
  return await axios.post(`${baseUrl}/auth/login`, data)
    .then(response => response.data) // Extract only the data
    .catch(error => {
      throw new Error(error.response?.data?.message || 'Login failed');
    });
};
