import { Movie } from '@/pages';
import { imgUrl } from '@/pages/api/requests';
import { useState } from 'react';

interface Row {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: Row) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className='space-y-3'>
      <h2 className='text-white text-base md:text-2xl font-bold hover:underline cursor-pointer'>
        {title}
      </h2>
      <div className='grid grid-cols-5 gap-3'>
        {movies?.slice(0, 10).map((movie) => (
          <div key={movie.id} className='relative group cursor-pointer'>
            <img
              src={`${imgUrl}/w500${movie.backdrop_path || movie.poster_path}`}
              alt='Thumbnail'
              className='object-cover rounded-md group-hover:opacity-50'
            />
            <h3 className='group-hover:block hidden text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-bold'>
              {movie.title || movie.name}
            </h3>
          </div>
        ))}
      </div>

      <div className={`${open ? 'hidden' : 'inline'} flex justify-center`}>
        <button
          onClick={() => setOpen(true)}
          className='bg-white rounded-sm px-2 hover:opacity-90 font-bold'
        >
          Show more
        </button>
      </div>

      <div className='grid grid-cols-5 gap-3'>
        {movies?.slice(10, 20).map((movie) => (
          <div
            key={movie.id}
            className={`${
              open ? 'block' : 'hidden'
            } relative group cursor-pointer`}
          >
            <img
              src={`${imgUrl}/w500${movie.backdrop_path || movie.poster_path}`}
              alt='Thumbnail'
              className='object-cover rounded-md group-hover:opacity-50'
            />
            <h3 className='group-hover:block hidden text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-bold'>
              {movie.title || movie.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
