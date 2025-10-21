import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import MovieCreditsCards from "../movieCreditsCards";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieCredits = ({ credits }) => {
  const cast = credits && Array.isArray(credits.cast) ? credits.cast : [];

  return (
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Movie Cast
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        This movie features {cast.length} actors.
      </Typography>

      <Paper sx={{ ...root }}>
        <li>
          <Chip label="Cast Members" sx={{ ...chip }} color="primary" />
        </li>
        <li>
          <Chip label={`${cast.length} total`} sx={{ ...chip }} />
        </li>
      </Paper>

      <MovieCreditsCards cast={cast} />
    </>
  );
};

export default MovieCredits;
