import { Movie } from '@/pages';
import { imgSrc } from '@/pages/api/tmdbApi';
import Link from 'next/link';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';

interface Gallery {
  title: string;
  movies: Movie[];
}

export default function MovieGallery({ title, movies }: Gallery) {
  const [open, setOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
            className='relative group cursor-pointer'
          >
            <img
              src={`${imgSrc}/w500${movie.backdrop_path || movie.poster_path}`}
              alt='Thumbnail'
              className='object-cover aspect-video rounded-md group-hover:opacity-50'
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
            } relative group cursor-pointer`}
            onClick={() => {
              setSelectedMovie(movie);
              setShowModal(true);
            }}
          >
            <img
              src={`${imgSrc}/w500${movie.backdrop_path || movie.poster_path}`}
              alt='Thumbnail'
              className='object-cover aspect-video rounded-md group-hover:opacity-50'
            />
            <h3 className='title opacity-0 group-hover:opacity-100 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-bold'>
              {movie.title || movie.name}
            </h3>
          </div>
        ))}
      </div>

      {showModal &&
        createPortal(
          <Modal setShowModal={setShowModal} movie={selectedMovie} />,
          document.body
        )}
    </div>
  );
}
