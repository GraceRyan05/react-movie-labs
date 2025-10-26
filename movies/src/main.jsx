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

import { useState, useMemo } from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  //useState to manage light/dark mode, initially set to 'light'
   const [mode, setMode] = useState('light');

   //function to toggle between light and dark mode
  const toggleTheme = () => {
    console.log("Toggling theme from:", mode);
    //checks current mode and switches to the other
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  //useMemo to create a theme object based on the current mode
   const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: mode,
        // Define custom colors for light and dark modes
        primary: {
          main: mode === 'light' ? '#21421e' : '#87a96b', // Asparagus / Light Asparagus
        },
        secondary: {
          main: mode === 'light' ? '#013220' : '#006a4e', // Dark Green / Muted Green
        },
        background: {
          default: mode === 'light' ? '#ffffff' : '#121212', // White / Dark Gray
          paper: mode === 'light' ? '#87a96b' : '#1e1e1e',   // Asparagus / Dark Gray
        }
      },
    }),
    [mode]
  );

  
  return (
    <QueryClientProvider client={queryClient}>
      <MoviesContextProvider>
        {/* ThemeProvider to apply the theme across the app */}
        <ThemeProvider theme={theme}>
          {/* CssBaseline to apply global CSS resets and base styles */}
          <CssBaseline /> 
      <BrowserRouter>
        <SiteHeader  onToggleTheme={toggleTheme} isDarkMode={mode === 'dark'}/>
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

//Light / Dark Mode Colour:
//https://mui.com/material-ui/customization/palette/#palette-mode
//https://react.dev/reference/react/useMemo
//https://mui.com/material-ui/customization/theming/#theme-provider
//https://mui.com/material-ui/customization/dark-mode/