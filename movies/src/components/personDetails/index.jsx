import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const PersonDetails = ({ person }) => {
  return (
    <>
   
      <Typography variant="h5" sx={{ mb: 1 }}>
        Biography
      </Typography>
      <Typography variant="body1" paragraph sx={{ whiteSpace: "pre-line" }}>
        {person.biography || "No biography available."}
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Known For
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {person.known_for_department || "Not specified"}
      </Typography>

      {person.homepage && (
        <Typography variant="body2" sx={{ mt: 2 }}>
        {" "}
          <a href={person.homepage} target="_blank" rel="noreferrer">
            Official Website
          </a>
        </Typography>
      )}
    </>
  );
};

export default PersonDetails;
