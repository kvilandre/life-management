import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAnimalDetails } from "../animals/useAnimalDetails";
import Divider from "@mui/material/Divider";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export function AnimalDetail() {
  const { id } = useParams();

  const { data: animalDetails, isLoading } = useAnimalDetails(parseInt(id!));

  if (isLoading) return "Loading...";

  const columns: GridColDef[] = [
    {
      field: "organizationAbbr",
      headerName: "Abbr.",
      width: 180,
      editable: false,
    },
    { field: "sportName", headerName: "Sport", width: 180, editable: false },
  ];

  var animalDetail = animalDetails;

  return (
    <>
      <Grid container spacing={3} className="animalDetailGrid">
        {animalDetail && (
          <>
            <Grid item xs={4}>
              <Box>
                <img
                  src={animalDetail.animalImage}
                  alt={animalDetail.callName}
                  width="200"
                  height="200"
                ></img>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <div className="animalDetail">
                <p>Animal Type: {animalDetail.animalValue}</p>
                <p>Full Name: {animalDetail.fullName}</p>
                <p>Age: {animalDetail.age}</p>
                <p>Breed: {animalDetail.breed}</p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="animalDetail">
                <p>Birth Date: {animalDetail.birthDate}</p>
                <p>Weight: {animalDetail.weight} lbs</p>
                <p>Calories Needed: {animalDetail.caloriesNeeded}</p>
                <p>Allergies: {animalDetail.allergies}</p>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  height: 300,
                  width: "100%",
                }}
              >
                <DataGrid
                  rows={animalDetail.sports}
                  getRowId={(row: any) => row.sportId}
                  columns={columns}
                  loading={isLoading}
                  editMode="row"
                />
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
