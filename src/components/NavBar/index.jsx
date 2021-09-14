import React, { useRef } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { Field, Formik } from "formik";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import { useBookData } from "../../context/book-context";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    color: "#000000",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontFamily: "Comfortaa",
    color: "#2E3B55",
  },
  span: {
    fontFamily: "Comfortaa",
    color: "#2E3B55",
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontFamily: "Comfortaa",
    background: "none",
    marginBottom: "0px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#e6e6e6",
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    color: "#000000",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
   
}));

const types = [
  {
    value: "title",
    label: "Titulo",
  },
  {
    value: "author",
    label: "Autor",
  },
];

const validationSchema = Yup.object().shape({
  search: Yup.string().required(),
  type: Yup.string().required(),
});

export default function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const formikRef = useRef(null);
  const { handleFindBook } = useBookData();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchEnter = () => {
    console.log("emnter");
    if (formikRef.current) {
      const {
        values: { search, type },
      } = formikRef.current;
      handleFindBook(search, type);
    }
  };

  const handlePressEnter = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      handleSearchEnter();
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link
          variant="outlined"
          color="textPrimary"
          href="#"
          className={classes.Link}
          to="/"
          onClick={() => localStorage.removeItem("token")}
        >
          Log out
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar} color="primary">
        <Toolbar>
          <div className={classes.search}>
            <Formik
              enableReinitialize
              validateOnBlur
              initialValues={{ search: "", type: "" }}
              validationSchema={validationSchema}
              innerRef={formikRef}
            >
              {({ isValid, dirty, resetForm }) => (
                <>
                  <Grid item xs={12}>
                    <Field
                      label="Tipo"
                      fullWidth
                      as={TextField}
                      select
                      size="small"
                      variant="outlined"
                      name="type"
                      className={classes.busqueda}
                    >
                      {types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      label="Buscar..."
                      fullWidth
                      as={TextField}
                      size="small"
                      variant="outlined"
                      name="search"
                      onKeyPress={handlePressEnter}
                    />
                  </Grid>
                </>
              )}
            </Formik>
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            Library <span className={classes.span}>- App</span>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="#000000"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="secondary"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
