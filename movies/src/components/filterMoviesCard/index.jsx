import React  from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/trees.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

  const ratings = [
    { id: "0", name: "All Ratings" },
    { id: "1", name: "1 Star" },
    { id: "2", name: "2 Stars" },
    { id: "3", name: "3 Stars" },
    { id: "4", name: "4 Stars" },
    { id: "5", name: "5 Stars" },
    { id: "6", name: "6 Stars" },
    { id: "7", name: "7 Stars" },
    { id: "8", name: "8 Stars" },
    { id: "9", name: "9 Stars" },
    { id: "10", name: "10 Stars" },
  ];
  

export default function FilterMoviesCard(props) {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleRatingChange = (e) => {
    handleChange(e, "rating", e.target.value);
  };

  return (
    <Card 
      sx={{
        backgroundColor: "#8fbc8f ", //tea green
        border: "1px solid",
        borderColor: "secondary.main",
        color: "secondary.main",
        boxShadow: 3,
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1" color="secondary.main">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
      sx={{...formControl}}
      id="filled-search"
      label="Search field"
      type="search"
      variant="filled"
      value={props.titleFilter}
      onChange={handleTextChange}
    />
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
           <Select
    labelId="genre-label"
    id="genre-select"
    defaultValue=""
    value={props.genreFilter}
    onChange={handleGenreChange}
  >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* Rating Filter */}
        <FormControl sx={{...formControl}}>
          <InputLabel id="rating-label">Rating</InputLabel>
          <Select
            labelId="rating-label"
            id="rating-select"
            value={props.ratingFilter}
            onChange={handleRatingChange}
          >
            {ratings.map((rating) => {
              return (
                <MenuItem key={rating.id} value={rating.id}>
                  {rating.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}