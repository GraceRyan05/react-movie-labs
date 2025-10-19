import React from "react";
import { getNowPlaying } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';

const NowPlayingPage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['nowPlaying'],
    queryFn: getNowPlaying,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;


    return (
      <PageTemplate
        title="Now Playing Movies"
        movies={movies}
        action={(movie) => {}}
      />
  );
};
export default NowPlayingPage;

