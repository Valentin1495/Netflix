import { useRouter } from 'next/router';
import { requests } from './api/requests';
import { Movie } from '@/pages';

import useSWRInfinite from 'swr/infinite';
import { tmdbAxios } from './api/axios';

export default function Genre() {
  const router = useRouter();
  const genre = router.query.genre as string;
  const endPoint = requests[genre as keyof typeof requests];
  let sign;

  switch (genre) {
    case 'Trending' || 'Top Rated':
      sign = '?';
      break;
    case 'Action' || 'Comdey' || 'Horror' || 'Romance' || 'Documentary':
      sign = '&';
      break;
    default:
      break;
  }

  const url = `${endPoint}${sign}api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=`;

  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => `${url}${index + 1}`,
    (url) => tmdbAxios.get(url).then((res) => res.data.results)
  );

  const movies = data ? [].concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20);

  return (
    <div>
      {movies?.map((movie: Movie) => (
        <h1 key={movie.id}>{movie.title || movie.name}</h1>
      ))}
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore
          ? 'loading...'
          : isReachingEnd
          ? 'no more issues'
          : 'load more'}
      </button>
    </div>
  );
}
