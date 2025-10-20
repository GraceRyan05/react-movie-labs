import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { Link } from "react-router";
import Button from "@mui/material/Button";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieCredits = ({ credits }) => {  // Don't miss this!
const [drawerOpen, setDrawerOpen] = useState(false);

const cast = credits.cast
const names = credits.cast.actors

  return (
    
    <> 

<Typography variant="h5">
    Movie Cast
</Typography>

<Typography variant="h6">
    This movie features {cast.length} actors.
</Typography>

<Paper component="ul" sx={{...root}} >
    <li>
        <Chip label="Cast Members" sx={{...chip}} color="primary" />
    </li>
    <li>
        <Chip label={`${cast.length} total`} sx={{...chip}} />
    </li>
</Paper>

<Paper component="ul" sx={{...root}} >
    <li>
        <Chip label="Cast Names" sx={{...chip}} color="primary" />
    </li>
    <li>
        <Chip label={`${names}`} />
    </li>
</Paper>


<Paper component="ul" sx={{...root}}>
    <li>
        <Chip label="Cast Names" sx={{...chip}} color="primary" />
    </li>
        {cast.map((actor) => (
          <li key={actor.id}>
            <Chip label={actor.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      </>
  );
};
export default MovieCredits ;