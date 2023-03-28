import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export const tmdbAxios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});
