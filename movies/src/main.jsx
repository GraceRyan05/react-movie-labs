import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MustWatchMoviesPage from "./pages/mustWatchPage";
import PopularPage from "./pages/popularMoviesPage";
import TopRatedPage from "./pages/topRatedPage";
import TrendingPage from "./pages/trendingMoviesPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import MovieCreditsPage from "./pages/movieCreditsPage";
import PersonDetailsPage from "./pages/personDetailsPage";

//MUI Theme Provider - Global theme settings for the app
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

//custom theme
const theme = createTheme({
  palette: {
    mode: `light`, //or dark???
    primary: {
      main: '#21421e', //asparagus
    },
    secondary: {
      main: '#013220', //dark green
    },
    background: {
      default: '#ffffff', //white
      paper: '#87a96b', //asparagus
    }
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MoviesContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline /> 
      <BrowserRouter>
        <SiteHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          <Route path="/movies/mustWatch" element={<MustWatchMoviesPage />} />
          <Route path="/movies/popularMovies" element={<PopularPage />} />
          <Route path="/movies/topRatedMovies" element={<TopRatedPage />} />
          <Route path="/movies/trendingMovies" element={<TrendingPage />} />
          <Route path="/movies/nowPlaying" element={<NowPlayingPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/reviews/:id" element={<MovieReviewPage />} />
          <Route path="/reviews/form" element={<AddMovieReviewPage />} />
          <Route path="/credits/:id" element={<MovieCreditsPage />} />
          <Route path="/person/:id" element={<PersonDetailsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
            
          </Routes>
      </BrowserRouter>
      </ThemeProvider>
      </MoviesContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);


//HTML COLOUR CODES:
//https://html-color.codes/green