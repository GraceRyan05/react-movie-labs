import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import TemplatePersonPage from "../components/templatePersonPage";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import PersonDetails from "../components/personDetails";
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";

const PersonDetailsPage = () => {
  const { id } = useParams();

  // person data
  const {data: person, error, isPending, isError} = useQuery({
    queryKey: ["person", { id: id }],
    queryFn: getPerson,
  });

  // movie credits data
  const {data: credits, creditsError, creditsPending, creditsIsError} = useQuery({
    queryKey: ["personCredits", { id: id }],
    queryFn: getPersonMovieCredits,
  });

  if (isPending || creditsPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
  if (creditsIsError) return <h1>{creditsError.message}</h1>;



  return (
    <>
      {person && credits ? (
        <TemplatePersonPage person={person}>
          <PersonDetails person={person} />
          <h2 style={{ marginTop: "2rem" }}>Known For</h2>
         <Grid key={credits.id} container spacing={5} sx={{ padding: "15px" }}>
          <MovieList movies={credits.cast} />
          </Grid>
        </TemplatePersonPage>
      ) : (
        <p>Waiting for actor details...</p>
      )}
    </>
  );
};

export default PersonDetailsPage;
