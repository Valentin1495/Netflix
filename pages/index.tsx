import Header from '@/components/Header';
import Head from 'next/head';
import Banner from '@/components/Banner';
import MovieGallery from '@/components/MovieGallery';
import {
  getActionMovies,
  getComedyMovies,
  getDocumentaries,
  getHorrorMovies,
  getRomanceMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from './api/tmdbApi';
import { createPortal } from 'react-dom';
import Modal from '@/components/Modal';
import { modalState } from '@/atoms/modalAtoms';
import { useRecoilValue } from 'recoil';
import { signIn, useSession } from 'next-auth/react';

export interface Movie {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface Movies {
  nowPlaying: Movie[];
  trending: Movie[];
  topRated: Movie[];
  romance: Movie[];
  horror: Movie[];
  comedy: Movie[];
  documentaries: Movie[];
  action: Movie[];
}

export default function Home({
  nowPlaying,
  trending,
  topRated,
  romance,
  horror,
  documentaries,
  comedy,
  action,
}: Movies) {
  const showModal = useRecoilValue(modalState);
  const { status } = useSession();

  if (status === 'loading') return <p>loading...</p>;

  if (status === 'authenticated')
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name='description' content='Generated by create next app' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main>
          <Header />
          <Banner nowPlaying={nowPlaying} />
          <section className='p-8 space-y-10'>
            <MovieGallery title='Trending' movies={trending} />
            <MovieGallery title='Top Rated' movies={topRated} />
            <MovieGallery title='Romance' movies={romance} />
            <MovieGallery title='Horror' movies={horror} />
            <MovieGallery title='Documentary' movies={documentaries} />
            <MovieGallery title='Comedy' movies={comedy} />
            <MovieGallery title='Action' movies={action} />
          </section>
        </main>
        {showModal && createPortal(<Modal />, document.body)}
      </>
    );
  return (
    <button onClick={() => signIn('google')} className='bg-white'>
      Sign in
    </button>
  );
}

export async function getServerSideProps() {
  const [
    nowPlaying,
    trending,
    topRated,
    romance,
    horror,
    documentaries,
    comedy,
    action,
  ] = await Promise.all([
    getUpcomingMovies(),
    getTrendingMovies(),
    getTopRatedMovies(),
    getRomanceMovies(),
    getHorrorMovies(),
    getDocumentaries(),
    getComedyMovies(),
    getActionMovies(),
  ]);

  return {
    props: {
      nowPlaying: nowPlaying.results,
      trending: trending.results,
      topRated: topRated.results,
      romance: romance.results,
      horror: horror.results,
      documentaries: documentaries.results,
      comedy: comedy.results,
      action: action.results,
    },
  };
}
