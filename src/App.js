import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import LoginPage from "./containers/LoginPage";
import HomePage from "./containers/HomePage";
import ProfilePage from "./containers/ProfilePage";
import BookDetailPage from "./containers/BookDetailPage";
import BookAddPage from "./containers/BookAddPage";

import NavBar from "./components/NavBar";
import BookDataProvider from "./context/book-context";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(https://i.ibb.co/JjgwVQv/bg.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));
function App() {
  const classes = useStyles();

  return (
    <BookDataProvider>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route
            className={classes.root}
            path="/"
            component={LoginPage}
            exact
          />
          <Route className={classes.root} path="/home" component={HomePage} />
          <Route
            className={classes.root}
            path="/books/:id"
            component={BookDetailPage}
          />
          <Route
            className={classes.root}
            path="/addbooks"
            component={BookAddPage}
          />
        </Switch>
      </BrowserRouter>
    </BookDataProvider>
  );
}

export default App;
