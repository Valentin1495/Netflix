import { Movie } from '@/pages';
import { imgSrc } from '@/pages/api/tmdbApi';
import Link from 'next/link';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState, selectedMovieState } from '@/atoms/modalAtoms';
import Image from 'next/image';

interface Gallery {
  title: string;
  movies: Movie[];
}

export default function MovieGallery({ title, movies }: Gallery) {
  const [open, setOpen] = useState<boolean>(false);
  const setShowModal = useSetRecoilState(modalState);
  const setSelectedMovie = useSetRecoilState(selectedMovieState);

  return (
    <div className='space-y-3'>
      <Link
        href={`/${title}`}
        className='text-white text-base md:text-2xl font-bold hover:underline cursor-pointer'
      >
        {title}
      </Link>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
        {movies?.slice(0, 12).map((movie) => (
          <div
            onClick={() => {
              setSelectedMovie(movie);
              setShowModal(true);
            }}
            key={movie.id}
            className='relative aspect-video group cursor-pointer'
          >
            <Image
              src={`${imgSrc}/w500${movie.backdrop_path || movie.poster_path}`}
              alt='Thumbnail'
              fill
              sizes='100%'
              className='object-cover rounded-md group-hover:opacity-50'
            />
            <h3 className='title opacity-0 group-hover:opacity-100 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-bold'>
              {movie.title || movie.name}
            </h3>
          </div>
        ))}
      </div>

      <div className={`${open ? 'hidden' : 'block'} flex justify-center`}>
        <button
          onClick={() => setOpen(true)}
          className='bg-white rounded-sm px-2 hover:opacity-90 font-bold'
        >
          Show more
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
        {movies?.slice(12, 20).map((movie) => (
          <div
            key={movie.id}
            className={`${
              open ? 'block' : 'hidden'
            } relative aspect-video group cursor-pointer`}
            onClick={() => {
              setSelectedMovie(movie);
              setShowModal(true);
            }}
          >
            <Image
              src={`${imgSrc}/w500${movie.backdrop_path || movie.poster_path}`}
              alt='Thumbnail'
              fill
              sizes='100%'
              className='object-cover rounded-md group-hover:opacity-50'
            />
            <h3 className='title opacity-0 group-hover:opacity-100 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-bold'>
              {movie.title || movie.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
