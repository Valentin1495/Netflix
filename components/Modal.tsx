import { useQuery } from '@tanstack/react-query';
import { getAllGenres, getVids } from '@/pages/api/tmdbApi';
import Loader from './Loader';
import { modalState, selectedMovieState } from '@/atoms/modalAtoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { supabase } from '@/utils/supabase';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Movie } from '@/pages';

interface Video {
  type: string;
  key: string;
  site: string;
}

interface Videos {
  results: Video[];
}

interface Genre {
  id: number;
  name: string;
}

interface Genres {
  genres: Genre[];
}

export default function Modal() {
  const [selectedMovie, setSelectedMovie] = useRecoilState(selectedMovieState);
  const setShowModal = useSetRecoilState(modalState);
  const [alreadyAdded, setAlreadyAdded] = useState<boolean>(false);
  const { data: session } = useSession();
  const email = session?.user?.email;

  const { isLoading, error, data } = useQuery<Videos>({
    queryKey: ['vids'],
    queryFn: () => getVids(selectedMovie?.id!),
    enabled: !!selectedMovie?.id,
  });

  const vids = data?.results;

  const trailer = vids?.find(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  );

  const {
    isLoading: isLoading1,
    error: error1,
    data: data1,
  } = useQuery<Genres>({
    queryKey: ['genres'],
    queryFn: () => getAllGenres(),
  });

  const genreList = selectedMovie?.genre_ids.map((id) => {
    if (data1) {
      const matchingGenre = data1.genres.filter((genre) => genre.id === id);

      return matchingGenre[0];
    }
  });

  const genreNames = genreList
    ?.filter((el) => {
      if (el) {
        return el;
      }
    })
    .map((el) => el?.name);

  const truncate = (str: string, num: number) => {
    if (str?.length > num) {
      return str?.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  useEffect(() => {
    const checkAlreadyAdded = async () => {
      const { data } = await supabase
        .from('My List')
        .select('movies')
        .eq('email', email);

      const moviesFromList: Movie[] = data![0].movies;

      setAlreadyAdded(
        !!moviesFromList.find((movie) => movie.id === selectedMovie?.id)
      );
    };

    checkAlreadyAdded();
  }, [email, selectedMovie?.id]);

  const addToList = async () => {
    const { data } = await supabase
      .from('My List')
      .select('movies')
      .eq('email', email);

    const moviesFromList: Movie[] = data![0].movies;

    const { error } = await supabase
      .from('My List')
      .update({
        movies: [...moviesFromList, selectedMovie],
      })
      .eq('email', email);

    if (error) {
      console.log(error);
    } else {
      setAlreadyAdded((prev) => !prev);
    }
  };

  const removeFromList = async () => {
    const { data } = await supabase
      .from('My List')
      .select('movies')
      .eq('email', email);

    const moviesFromList: Movie[] = data![0].movies;

    const { error } = await supabase
      .from('My List')
      .update({
        movies: moviesFromList.filter(
          (movie) => movie.id !== selectedMovie?.id
        ),
      })
      .eq('email', email);

    if (error) {
      console.log(error);
    } else {
      setAlreadyAdded((prev) => !prev);
    }
  };

  const handleMyList = async () => {
    if (alreadyAdded) {
      removeFromList();
    } else {
      addToList();
    }
  };

  return (
    <div>
      <div className='z-20 w-96 sm:w-[500px] lg:w-[700px] bg-black fixed top-32 lg:top-24 left-1/2 -translate-x-1/2'>
        {isLoading && <Loader />}
        {error instanceof Error && <p>Something went wrong: {error.message}</p>}

        {trailer ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title='movie-trailer'
            allowFullScreen
            className='w-full aspect-video'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          ></iframe>
        ) : (
          <div className='bg-black text-white w-96 sm:w-[500px] lg:w-[700px] aspect-video flex justify-center items-center font-bold text-xl'>
            Trailer not available
          </div>
        )}
        <div className='p-5 space-y-3'>
          <div className='font-semibold flex items-center text-sm text-gray-200 space-x-3'>
            <span>
              {(selectedMovie?.vote_average! * 10).toFixed(0)}%{' '}
              <span className='font-normal'>match</span>
            </span>
            <span>
              {selectedMovie?.release_date || selectedMovie?.first_air_date}
            </span>
            <button onClick={handleMyList}>
              {alreadyAdded ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    fillRule='evenodd'
                    d='M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5zm6.61 10.936a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                    clip-rule='evenodd'
                  />
                  <path d='M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M3.75 3A1.75 1.75 0 002 4.75v10.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-8.5A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM10 8a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 0110 8z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </button>
          </div>
          <div className='text-gray-200 flex items-center'>
            <p className='w-2/3 hidden lg:block'>{selectedMovie?.overview}</p>
            <p className='w-2/3 block lg:hidden'>
              {truncate(selectedMovie?.overview!, 200)}
            </p>
            <div className='ml-3 text-center w-1/3 text-sm space-y-2'>
              Genres:
              {isLoading1 && <Loader />}
              {error1 instanceof Error && <p>Error occured</p>}
              <div className='space-x-1.5'>
                <span className='font-semibold'>{genreNames?.join(', ')}</span>
              </div>
              <h3>
                Original language: <br />
                <span className='font-semibold'>
                  {selectedMovie?.original_language}
                </span>
              </h3>
              <h3>
                Total votes:{' '}
                <span className='font-semibold'>
                  {selectedMovie?.vote_count}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setShowModal(false);
          setSelectedMovie(null);
        }}
        className='z-10 fixed inset-0 bg-black/50'
      ></div>
    </div>
  );
}
