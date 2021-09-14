import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';
import BookCard from "../BookCard";
import { Box, Button } from "@material-ui/core";
import BookModal from "../BookModal";
import { useBookData } from "../../context/book-context";
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
  control: {
    padding: theme.spacing(2),
  },
  button: {
    backgroundColor: "#2E3B55",
    color: "white",
    margin:"0.5em",
  },
}));

export default function BookCardList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingCreating, setLoadingCreating] = useState(false);
  const [error, setError] = useState("");
  const { books, handleAddBook, searchResults, setBooks } = useBookData();
  const classes = useStyles();
 
  useEffect(() => {
    api
      .get("books/")
      .then(({ data }) => setBooks(data.results))
      .catch((err) => console.error(err));
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCreateBook = (values) => {
    setLoadingCreating(true);
    api
      .post("books/", values)
      .then(({data}) => handleAddBook(data))
      .catch((err) => console.error(err));

    setLoadingCreating(false);
  };

  return (
    <>
      <Box mb={2}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleOpenDialog}
          className={classes.button}
        >
          Agregar libro
        </Button>
      </Box>
      {searchResults.length > 0 && (
        <>
          <div>Resultado de busqueda</div>
          <Grid container className={classes.root} spacing={2}>
            {searchResults.map((book) => (
              <Grid item xs={12} sm={3}>
                <BookCard book={book} />  
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Grid container className={classes.root} spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={3}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
      
      <BookModal
        openDialog={openDialog}
        handleClose={handleClose}
        title="Agregar libro"
        buttonLabel="Agregar libro"
        loading={loadingCreating}
        getSubmitClickAction={handleCreateBook}
      />
    </>
  );
}
