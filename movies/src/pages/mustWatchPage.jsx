import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromMustWatch from "../components/cardIcons/removeFromPlaylist";

const MustWatchMoviesPage = () => {
  const {mustWatch: movieIds = [] } = useContext(MoviesContext);

  console.log("Must watch IDs from context: ", movieIds);

  // Create an array of queries and run in parallel.
  const mustWatchMovieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
        retry: false,
    })),
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = mustWatchMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = mustWatchMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

 

    return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromMustWatch movie={movie} />
          </>
        );
      }}
    />
  );
};

export default MustWatchMoviesPage;