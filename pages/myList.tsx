import { supabase } from '@/utils/supabase';
import { Movie } from '.';
import { useSession } from 'next-auth/react';
import { imgSrc } from './api/tmdbApi';

interface User {
  email: string;
  movies: Movie[];
}

export default function MyList({ myList }: { myList: User[] }) {
  const { data: session } = useSession();

  const user = myList.find((el) => el.email === session?.user?.email);

  return (
    <div className='space-y-3 p-8'>
      <h1 className='text-white text-base md:text-2xl font-bold'>My List</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
        {user?.movies.map((movie, idx) => (
          <div key={idx} className='relative group cursor-pointer'>
            <img
              src={`${imgSrc}/w500${movie.backdrop_path || movie.poster_path}`}
              alt='Thumbnail'
              className='object-cover w-full rounded-md group-hover:opacity-50'
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

export async function getServerSideProps() {
  const { data, error } = await supabase.from('My List').select();

  if (error) {
    console.log(error);
  }

  return {
    props: {
      myList: data,
    },
  };
}
