import { useQuery } from '@tanstack/react-query';
import { getVids } from '@/pages/api/tmdbApi';
import Loader from './Loader';
import { modalState, selectedMovieState } from '@/atoms/modalAtoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface Video {
  type: string;
  key: string;
  site: string;
}

interface Videos {
  results: Video[];
}

export default function Modal() {
  const [selectedMovie, setSelectedMovie] = useRecoilState(selectedMovieState);
  const setShowModal = useSetRecoilState(modalState);
  const { isLoading, error, data } = useQuery<Videos>({
    queryKey: ['vids'],
    queryFn: () => getVids(selectedMovie?.id!),
    enabled: !!selectedMovie?.id,
  });

  const vids = data?.results;
  const trailer = vids?.find(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  );

  if (isLoading) return <Loader />;

  if (error instanceof Error)
    return <p>Something went wrong: {error.message}</p>;

  return (
    <div>
      <div className='z-20 bg-black fixed top-40 lg:top-24 left-1/2 -translate-x-1/2'>
        {trailer ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title='movie-trailer'
            allowFullScreen
            className='w-96 sm:w-[500px] lg:w-[700px] aspect-video'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          ></iframe>
        ) : (
          <div className='bg-black text-white w-96 sm:w-[500px] lg:w-[700px] aspect-video flex justify-center items-center font-bold text-xl'>
            Trailer not available
          </div>
        )}
        <div className='p-5 space-y-3'>
          <div className='font-semibold flex items-center text-sm text-gray-200 space-x-3'>
            <span>50% match</span>
            <span>2023-04-19</span>
            <button>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-5 h-5'
              >
                <path
                  fill-rule='evenodd'
                  d='M3.75 3A1.75 1.75 0 002 4.75v10.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-8.5A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM10 8a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 0110 8z'
                  clip-rule='evenodd'
                />
              </svg>
            </button>
          </div>
          <div className='text-gray-200 flex space-x-3'>
            <p className='w-2/3'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
              a tempore consectetur quo reiciendis officia necessitatibus, ea
              veritatis natus?
            </p>
            <div className='text-right w-1/3 text-sm font-semibold space-y-1.5'>
              <h3>
                Genres: <br />
                Action, Comedy
              </h3>
              <h3>Original language: en</h3>
              <h3>Total votes: 100</h3>
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
