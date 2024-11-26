import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useAnimalCards } from "../animals/useAnimalCards";
import { Link, useSearchParams } from "react-router-dom";

export default function AnimalOverview() {
  const { data: animalCards = [], isLoading } = useAnimalCards();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("animalValue") ?? "";

  if (isLoading) return "Loading...";

  console.log(search);

  const matchingAnimals = search
    ? animalCards.filter((animal) =>
        animal.animalValue.toLowerCase().includes(search.toLowerCase())
      )
    : animalCards;

  return (
    <>
      <Grid container spacing={3}>
        {matchingAnimals.length > 0 &&
          matchingAnimals.map((ac) => (
            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <Link to={`/AnimalDetail/${ac.animalId}`}>
                    <CardMedia
                      component="img"
                      height="140"
                      src={ac.animalImage}
                      alt={ac.callName}
                    />
                  </Link>
                  <CardContent>
                    <Box>
                      <Typography gutterBottom variant="h5" component="div">
                        {ac.callName}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Age: {ac.age}
                        <br />
                        Full Name: {ac.fullName}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
                {/* <Divider /> */}
                {/* <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Box>
                    <ul>
                      {ac.titlesWorkingToward &&
                        ac.titlesWorkingToward.map((tw) => (
                          <li key={ac.id}>{tw.name}</li>
                        ))}
                    </ul>
                  </Box>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
