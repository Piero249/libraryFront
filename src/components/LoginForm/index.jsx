import React from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../services/api";

const Login = ({ handleChange }) => {
  const paperStyle = {
    padding: "30px",
    width: 300,
    margin: "0 auto",
    backgroundColor: "#FF000000",
    fontFamily: "Comfortaa",
  };
  const hStyle = {
    color: "black",
  };
  const avatarStyle = { backgroundColor: "#2E3B55" };
  const btnstyle = { margin: "8px 0" };
  const initialValues = {
    username: "",
    password: "",
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Requerido"),
    password: Yup.string().required("Requerido"),
  });
  const gStyle = {
    backgroundColor: "",
  };
  const history = useHistory();
  const onSubmit = (values, props) => {
    const username = values["username"];
    const password = values["password"];

    api
      .post("token-auth/", { username: username, password: password })
      .then(({data}) => localStorage.setItem("token", data.token))
      .catch((err) => console.error(err));

    history.push("/home");
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };
  return (
    <Grid style={gStyle}>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2 style={hStyle}>Inicia sesion</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <Field
                as={TextField}
                label="Usuario"
                name="username"
                placeholder="Ingresa tu usuario"
                fullWidth
                required
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                label="Contraseña"
                name="password"
                placeholder="Ingresa tu contraseña"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting || !isValid || !dirty}
                style={btnstyle}
                fullWidth
                style={{ background: "#2E3B55", margin: "20px 0px" }}
              >
                {isSubmitting ? "Cargando" : "LogIn"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Login;
