import { useState, useRef, useEffect, useMemo } from 'react';
import { Movie } from '.';
import { axiosInstance } from './api/axios';
import { AxiosError } from 'axios';
import debounce from 'lodash.debounce';
import { endpoints, imgSrc } from './api/tmdbApi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState, selectedMovieState } from '@/atoms/modalAtoms';
import Modal from '@/components/Modal';
import { createPortal } from 'react-dom';

export default function Upcoming() {
  // const router = useRouter();
  // const genre = router.query.genre as string;
  // const endPoint = requests[genre as keyof typeof requests];

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(0);
  const setSelectedMovie = useSetRecoilState(selectedMovieState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const endPoint = endpoints.upComing;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axiosInstance.get(`${endPoint}?page=${page}`);
        const newMovies = res.data.results;

        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };

    fetchMovies();
  }, [page, endPoint]);

  const ref = useRef<HTMLDivElement>(null);

  const callback = useMemo(
    () =>
      debounce((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
          }
        });
      }, 500),
    [setPage]
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback]);

  return (
    <div className='space-y-3 p-8'>
      <h1 className='text-white text-base md:text-2xl font-bold'>
        Upcoming Movies
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
        {movies.map((movie, idx) => (
          <div
            onClick={() => {
              setSelectedMovie(movie);
              setShowModal(true);
            }}
            key={idx}
            className='relative group cursor-pointer'
          >
            <img
              src={`${imgSrc}/w500${movie.backdrop_path || movie.poster_path}`}
              alt='Thumbnail'
              className='object-cover w-full rounded-md group-hover:opacity-50'
            />
            <h3 className='title opacity-0 group-hover:opacity-100 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-bold'>
              {movie.title || movie.name}
            </h3>
          </div>
        ))}
        <div ref={ref} className='h-[1px]' />
      </div>
      {showModal && createPortal(<Modal />, document.body)}
    </div>
  );
}
