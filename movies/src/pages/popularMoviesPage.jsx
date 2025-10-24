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
  const totalPages = Math.min(data.total_pages, 500); // TMDB API only allows access to first 500 pages - avoid app crashing

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


//Pagination Sources:
//https://mui.com/material-ui/react-pagination/
//https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries
//https://react.dev/reference/react/useState
