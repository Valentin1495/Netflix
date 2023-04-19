import { useQuery } from '@tanstack/react-query';
import { getVids } from '@/pages/api/tmdbApi';
import Loader from './Loader';
import { Movie } from '@/pages';

interface Video {
  type: string;
  key: string;
  site: string;
}

interface Videos {
  results: Video[];
}

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  movie: Movie | null;
}

export default function Modal({ setShowModal, movie }: ModalProps) {
  const { isLoading, error, data } = useQuery<Videos>({
    queryKey: ['vids'],
    queryFn: () => getVids(movie?.id!),
    enabled: !!movie?.id,
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
      <div className='z-20 fixed top-40 lg:top-24 left-1/2 -translate-x-1/2'>
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
        <div></div>
      </div>
      <div
        onClick={() => setShowModal(false)}
        className='z-10 fixed inset-0 bg-black/50'
      ></div>
    </div>
  );
}
