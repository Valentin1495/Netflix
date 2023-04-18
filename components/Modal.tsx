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
      <div className='z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {trailer ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?controls=0&autoplay=1&mute=1&loop=1`}
            title='movie-trailer'
            allowFullScreen
            className='w'
          ></iframe>
        ) : (
          <p>Trailer is not available</p>
        )}
      </div>
      <div
        onClick={() => setShowModal(false)}
        className='z-10 fixed inset-0 bg-black/50'
      ></div>
    </div>
  );
}
