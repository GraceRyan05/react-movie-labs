import React from "react";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { getPersonImages } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";


const ImageURL = "https://image.tmdb.org/t/p/w500";

const TemplatePersonPage = ({ person, children }) => {
  const navigate = useNavigate();
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["person-images", { id: person.id }],
    queryFn: getPersonImages,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const images = data?.profiles || [];

  return (
    <>

      <Paper
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: 1.5,
          margin: 0,
        }}
      >
        <IconButton aria-label="go back" onClick={() => navigate(-1)}>
          <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>

        <Typography variant="h4" component="h3">
          {person.name}
          {person.homepage && (
            <a href={person.homepage} target="_blank" rel="noreferrer">
              <HomeIcon color="primary" />
            </a>
          )}
        </Typography>

        <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
          <ArrowForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </Paper>

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={12} sm={3}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <ImageList sx={{ height: "80vh" }} cols={1}>
              {images.length === 0 && (
                <ImageListItem key="no-image" cols={1}>
                  <Typography variant="body2">No images available.</Typography>
                </ImageListItem>
              )}
              {images.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img src={`${ImageURL}${image.file_path}`} alt={person.name} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={12} sm={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplatePersonPage;

