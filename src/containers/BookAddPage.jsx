import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BookCardList from "../components/BookCardList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    allignItems: "center",
    padding: " 0 0 0",
    minHeight: "100vh",
    backgroundImage: `url(https://i.ibb.co/JjgwVQv/bg.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

export default function BookAddPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Add Book</h1>
    </div>
  );
}
