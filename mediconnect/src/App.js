import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CoolButton from "./CoolButton"
export default function App() {
  const cool = false
  return (
    <CoolButton cool={cool}></CoolButton>
  );
}
