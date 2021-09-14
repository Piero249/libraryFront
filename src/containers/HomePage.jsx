import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BookCardList from "../components/BookCardList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px",
    minHeight: "90vh",
    backgroundImage: `url(https://i.ibb.co/JjgwVQv/bg.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  btn: {
    color: "white",
    bottom: 30,
    position: "absolute",
    backgroundColor: "#2E3B55",
    right: 30,
  },
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BookCardList />
    </div>
  );
}
