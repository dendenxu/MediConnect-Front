import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";
import CoffeeCard from "./CoffeeCard";

const Content = () => {
  return (
    <Grid container spacing={4}>
      {/* Whatever you define, it'll go all the way to the next defined or the maximum */}
      <Grid item xs={12} sm={6} lg={4}>
        <CoffeeCard
          title="Shrimp And Chorizo Paella"
          subtitle="September 14, 2016"
          avatarSrc="https://worldvectorlogo.com/download/google-icon.svg"
        />
      </Grid>
    </Grid>
  );
};

export default Content;
