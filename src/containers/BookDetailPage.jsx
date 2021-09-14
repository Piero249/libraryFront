import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BookDetail from "../components//BookDetail";

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

    "& > div": {
      flexGrow: 1,
    },
  },
}));

export default function BookDetailPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BookDetail />
    </div>
  );
}
