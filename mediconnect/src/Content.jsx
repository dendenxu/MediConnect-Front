import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";
import CoffeeCard from "./CoffeeCard";
import { ReactComponent as GoogleIcon } from "./google-icon.svg";

const Content = () => {
  return (
    <Grid container spacing={4}>
      {/* Whatever you define, it'll go all the way to the next defined or the maximum */}
      <Grid item xs={12} sm={6} lg={4}>
        <CoffeeCard
          title="Shrimp And Chorizo Paella"
          subtitle="September 14, 2016"
          avatarIcon={<GoogleIcon width="24px" height="24px" />}
          imgSrc="https://www.bing.com/th?id=OHR.Inisheer_EN-US8680602205_1920x1200.jpg&rf=LaDigue_1920x1200.jpg"
        />
      </Grid>
    </Grid>
  );
};

export default Content;
