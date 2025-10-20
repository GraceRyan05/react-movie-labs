import React from "react";
import { useParams } from 'react-router';
import TemplateCreditsPage from "../components/templateCreditsPage";
import { getMovie, getMovieCredits } from '../api/tmdb-api'
import MovieCredits from "../components/movieCredits";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'


const MovieCreditsPage = (props) => {
  const { id } = useParams();

  //movie data
    const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })

  //credits data
  const { data: credits, creditsError, creditsPending, creditsIsError } = useQuery({
    queryKey: ['credits', {id: id}],
    queryFn: getMovieCredits,
  })

  if (isPending || creditsPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (creditsIsError) {
    return <h1>{creditsError.message}</h1>;
  }

  return (
    <>
      {movie && credits ? (
        <>
          <TemplateCreditsPage movie={movie} credits={credits}>
<MovieCredits credits={credits} />
          </TemplateCreditsPage>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieCreditsPage;