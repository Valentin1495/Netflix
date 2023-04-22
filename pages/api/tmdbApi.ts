import { axiosInstance } from './axios';

export const endpoints = {
  upComing: '/movie/upcoming',
  nowPlaying: '/movie/now_playing',
  genres: '/genre/movie/list',
  Trending: '/trending/all/week',
  'Top Rated': '/movie/top_rated',
  Action: '/discover/movie?with_genres=28',
  Comedy: '/discover/movie?with_genres=35',
  Horror: '/discover/movie?with_genres=27',
  Romance: '/discover/movie?with_genres=10749',
  Documentary: '/discover/movie?with_genres=99',
};

export const imgSrc = 'https://image.tmdb.org/t/p';

export const getUpcomingMovies = () =>
  axiosInstance.get(endpoints.upComing).then((res) => res.data);

export const getTrendingMovies = () =>
  axiosInstance.get(endpoints.Trending).then((res) => res.data);

export const getTopRatedMovies = () =>
  axiosInstance.get(endpoints['Top Rated']).then((res) => res.data);

export const getRomanceMovies = () =>
  axiosInstance.get(endpoints.Romance).then((res) => res.data);

export const getHorrorMovies = () =>
  axiosInstance.get(endpoints.Horror).then((res) => res.data);

export const getDocumentaries = () =>
  axiosInstance.get(endpoints.Documentary).then((res) => res.data);

export const getComedyMovies = () =>
  axiosInstance.get(endpoints.Comedy).then((res) => res.data);

export const getActionMovies = () =>
  axiosInstance.get(endpoints.Action).then((res) => res.data);

export const getVids = (movieId: number) =>
  axiosInstance.get(`/movie/${movieId}/videos`).then((res) => res.data);

export const getAllGenres = () =>
  axiosInstance.get(endpoints.genres).then((res) => res.data);
