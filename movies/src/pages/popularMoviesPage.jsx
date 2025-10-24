import React from "react";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

import { Pagination, Stack, Box } from '@mui/material';


const PopularPage = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['popular', currentPage],
    queryFn: () => getPopularMovies(currentPage),
    keepPreviousData: true,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


    return (
      <>
      <PageTemplate
        title="Popular Movies"
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
            size="large"
            showFirstButton
            showLastButton 
          />
        </Stack>
      </Box>
      </>
  );
};
export default PopularPage;

