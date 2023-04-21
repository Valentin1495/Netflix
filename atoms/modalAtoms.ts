import { Movie } from '@/pages';
import { atom } from 'recoil';

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
});

export const selectedMovieState = atom<Movie | null>({
  key: 'selectedMovieState',
  default: null,
});
