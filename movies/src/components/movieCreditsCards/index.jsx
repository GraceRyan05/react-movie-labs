import React, { useState  } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router";
import PersonDetails from "../personDetails";

const ImageURL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2";

const MovieCreditsCards = ({ cast }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedActor, setSelectedActor] = useState(null);

    const openActor = (actor) => {
        setSelectedActor(actor);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setSelectedActor(null);
    };

    return (
        <>
        <Grid container spacing={2} sx={{mt:1}}>
            {cast.map((actor) => (
                <Grid item key={actor.id} xs={12} sm={6} md={4} lg={3} xl={2} sx={{padding: "12px"}}>
                    <Card sx={{ height: '100%' }} onClick={() => openActor(actor)}>
                        <CardHeader
                            avatar={
                                <Avatar alt={actor.name} src={actor.profile_path ? `${ImageURL}${actor.profile_path}` : "/no-image.jpg"} />
                            }
                                title ={<Typography variant="h6">{actor.name}</Typography>}
                                subheader={actor.character ? `as ${actor.character}` : null}
                                />
                        <CardMedia component="img" height="350" image={actor.profile_path ? `${ImageURL}${actor.profile_path}` : "/no-image.jpg"} alt={actor.name}/>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Known for: {actor.known_for_department}
                            </Typography>
                            <Button variant="outlined" fullwidth>
                                View Details
                            </Button>
                        </CardContent>
                        </Card>
                </Grid>
            ))}
        </Grid>
        <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
            {selectedActor && (
                <div style={{ width: '320px', padding: '16px' }} role="presentation">
                    {selectedActor ? (
                        <>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <Avatar
                                    alt={selectedActor.name}
                                    src={selectedActor.profile_path ? `${ImageURL}${selectedActor.profile_path}` : undefined}
                                    sx={{ width: 64, height: 64 }}
                                >
                                    {(!selectedActor.profile_path && selectedActor.name) ? selectedActor.name.charAt(0) : null}
                                </Avatar>
                                <div>
                                    <Typography variant="h6">{selectedActor.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{selectedActor.character ? `as ${selectedActor.character}` : ''}</Typography>
                                </div>
                            </div>

                            <div style={{ marginTop: 12 }}>
                <Typography variant="subtitle2">Overview</Typography>
                <Typography variant="body2" paragraph>
                  {selectedActor.biography || selectedActor.overview ||
                    "No biography available."}
                </Typography>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/person/${selectedActor.id}`}
                  onClick={closeDrawer}
                >
                  View profile
                </Button>
                <Button variant="outlined" onClick={closeDrawer}>
                  Close
                </Button>
              </div>
            </>
          ) : (
            <Typography variant="body1">
              Select an actor to see details
            </Typography>
          )}
            
        </div>
)}
      </Drawer>
    </>
  );
};

export default MovieCreditsCards;


        