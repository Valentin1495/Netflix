import { Movie } from '@/pages';
import { imgUrl } from '@/pages/api/requests';
import { InformationCircleIcon, PlayIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

interface nowPlaying {
  nowPlaying: Movie[];
}

export default function Banner({ nowPlaying }: nowPlaying) {
  const [movie, setMovie] = useState<Movie | null>(null);

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
    <div className='relative'>
      <div className='absolute w-full h-screen bg-gradient-to-t from-black' />
      <img
        src={`${imgUrl}/${movie?.backdrop_path || movie?.poster_path}`}
        alt='Banner Image'
        className='w-full object-cover h-screen'
      />

      <div className='absolute top-1/3 sm:top-1/4 left-5 right-5 sm:left-10 max-w-lg md:max-w-2xl'>
        <h1 className='py-3 truncate italic text-white text-3xl md:text-5xl'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className='text-white text-base md:text-xl'>
          {truncate(movie?.overview!, 200)}
        </p>
        <div className='flex justify-start gap-x-10 mt-3'>
          <button className='banner-btn'>
            <PlayIcon className='banner-icon' /> Play
          </button>
          <button className='banner-btn'>
            <InformationCircleIcon className='banner-icon' /> More Info
          </button>
        </div>
      </div>
    </div>
  );
}
