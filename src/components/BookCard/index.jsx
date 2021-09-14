import React, { useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useBookData } from "../../context/book-context";
import BookModal from "../BookModal";
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff95",
    textAlign: "center",
    margin:"5em 1em",
  },
  actions: {
    textAlign: "center",
  },
  link: {
    fontFamily: "Comfortaa",
    textDecoration: "none",
  },
  button: {
    margin: "10px 0",
    backgroundColor: "#2E3B55",
    color: "white",
    fontFamily: "Comfortaa",
    textDecoration: "none",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
    height: 140,
  },
  media: {
    height: 140,
  },
  avatar: {
    backgroundColor: "#2E3B55",
  },
  text: {
    fontFamily: "Comfortaa",
  },
}));

export default function BookCard({ book }) {
  const classes = useStyles();
  const history = useHistory();
  const { handleUpdateBook, handleRemoveBook, books } = useBookData();
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCardClick = () => {
    history.push(`/books/${book.id}`);
  };

  const handleDelete = () => {
    api
      .delete(`books/${book.id}/`)
      .then(() => handleRemoveBook(book.id))
      .catch((err) => console.error(err));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleEdit = (values) => {
    setLoading(true);
    api
      .put(`books/${book.id}/`, values)
      .then(() => handleUpdateBook(values))
      .catch((err) => console.error(err));
    setLoading(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader title={book.tittle} subheader={book.published_year} />
        <CardMedia
          className={classes.media}
          image={book.image}
          title={book.tittle}
        />
        <CardContent onClick={handleCardClick}>
          <Typography
            className={classes.text}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Autor: {book.author}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {book.title}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph className={classes.text}>
              Stock:
            </Typography>
            <Typography paragraph className={classes.text}>
              {book.stock}
            </Typography>
            <Button
              fullWidth
              className={classes.button}
              onClick={handleOpenDialog}
            >
              Editar
            </Button>
            <Button fullWidth className={classes.button} onClick={handleDelete}>
              Eliminar
            </Button>
          </CardContent>
        </Collapse>
      </Card>
      <BookModal
        openDialog={openDialog}
        handleClose={handleClose}
        title="Editar libro"
        buttonLabel="Editar libro"
        loading={loading}
        getSubmitClickAction={handleEdit}
        values={book}
      />
    </>
  );
}
