import { Container, Grid } from "@mui/material";
import PropertyCard from "Components/PropertyList/PropertyCard";

function PropertyList() {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PropertyCard />
        </Grid>
        <Grid item xs={12}>
          <PropertyCard />
        </Grid>
        <Grid item xs={12}>
          <PropertyCard />
        </Grid>
        <Grid item xs={12}>
          <PropertyCard />
        </Grid>
        <Grid item xs={12}>
          <PropertyCard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default PropertyList;

{
  /* <div>
      <ol>
        <li>project name</li>
        <li>Group</li>
        <li>location</li>
        <li>city</li>
        <li>sector</li>
        <li>score</li>
        <li>Price range</li>
        <li>3bhk,4bhk</li>
        <li>Possession time</li>
        <li>Construction status</li>
      </ol>
    </div> */
}
