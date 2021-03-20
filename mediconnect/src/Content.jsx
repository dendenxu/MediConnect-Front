import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";
import CoffeeCard from "./CoffeeCard";
import { ReactComponent as GoogleIcon } from "./google-icon.svg";
import coffeeMakerList from "./constants";

const Content = () => {
  const getCoffeeMakerCard = (coffeeMakerObj) => {
    return (
      <Grid item xs={12} sm={6} lg={4}>
        <CoffeeCard {...coffeeMakerObj} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={4}>
      {/* Whatever you define, it'll go all the way to the next defined or the maximum */}
      {/* <CoffeeCard
          title="Shrimp And Chorizo Paella"
          subtitle="September 14, 2016"
          avatarSrc="https://lh3.googleusercontent.com/ogw/ADGmqu-pjeZCxDJPJ_NQeOyZ5NvCC9-E70Ep9BhIzudW=s64-c-mo"
          imgSrc="https://www.bing.com/th?id=OHR.Inisheer_EN-US8680602205_1920x1200.jpg&rf=LaDigue_1920x1200.jpg"
          description="For this video, I downloaded Figma and Material's plugin for Figma and made a very basic UX design. The point of the video is to showcase how you would go about coding a site from scratch with React and Material UI while following a UX design."
        /> */}
      {coffeeMakerList.map((coffeeMakerObj) =>
        getCoffeeMakerCard(coffeeMakerObj)
      )}
    </Grid>
  );
};

export default Content;
