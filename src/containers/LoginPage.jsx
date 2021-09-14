import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import api from "../services/api";
import SignInOutContainer from "./Index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: `url(https://i.ibb.co/JjgwVQv/bg.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SignInOutContainer />
    </div>
  );
}
