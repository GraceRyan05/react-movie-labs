import React from "react";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';

//pagination
import { Pagination, Stack, Box } from "@mui/material";

const TrendingPage = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['trending', currentPage],
    queryFn: () => getTrendingMovies(currentPage),
    keepPreviousData: true,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;
  const totalPages = Math.min(data.total_pages, 500); // TMDB API only allows access to first 500 pages - avoid app crashing

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


    return (
      <>
      <PageTemplate
        title="Trending Movies"
        movies={movies}
        action={(movie) => {}}
      />
      <Box display="flex" justifyContent="center" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Stack spacing={2}>
          <Pagination 
            count={totalPages}
            page={currentPage} 
            onChange={handlePageChange} 
            color="primary"
          />
        </Stack>
      </Box>
      </>
  );
};
export default TrendingPage;

