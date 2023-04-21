import { Movie } from '@/pages';
import { imgSrc } from '@/pages/api/tmdbApi';
import { PlayIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { modalState, selectedMovieState } from '@/atoms/modalAtoms';
import { useSetRecoilState } from 'recoil';

interface nowPlaying {
  nowPlaying: Movie[];
}

export default function Banner({ nowPlaying }: nowPlaying) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const setSelectedMovie = useSetRecoilState(selectedMovieState);
  const setShowModal = useSetRecoilState(modalState);

  useEffect(() => {
    setMovie(nowPlaying[Math.floor(Math.random() * nowPlaying.length)]);
  }, [nowPlaying]);

  const truncate = (str: string, num: number) => {
    if (str?.length > num) {
      return str?.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  return (
    <div className='relative h-[60vh] lg:h-[80vh]'>
      <img
        src={`${imgSrc}/original${movie?.backdrop_path || movie?.poster_path}`}
        alt='Banner Image'
        className='w-full object-cover h-full'
      />

      <div className='absolute top-1/3 sm:top-1/4 left-5 right-5 sm:left-10 max-w-lg md:max-w-2xl'>
        <h1 className='py-3 truncate italic text-white text-3xl md:text-5xl'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className='text-white text-base md:text-xl'>
          {truncate(movie?.overview!, 200)}
        </p>
        <div className='mt-3 mb-5'>
          <button
            className='banner-btn'
            onClick={() => {
              setShowModal(true);
              setSelectedMovie(movie);
            }}
          >
            <PlayIcon className='banner-icon' /> Play
          </button>
        </div>
        <Link href='/upcoming' className='banner-btn w-fit'>
          See all upcoming movies
        </Link>
      </div>
    </div>
  );
}
