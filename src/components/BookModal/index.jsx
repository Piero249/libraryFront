import React, { useEffect, useRef, useState } from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";

import ModalBase from "../ModalBase";
import { Grid, TextField } from "@material-ui/core";

const valuesData = {
  title: "",
  author: "",
  edition: "",
  published_year: "",
  stock: "",
  image: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required(),
  author: Yup.string().required(),
  edition: Yup.string().required(),
  published_year: Yup.string().required(),
  stock: Yup.number().required(),
  image: Yup.string().required(),
});

const BookModal = ({
  openDialog,
  handleClose,
  title,
  buttonLabel,
  loading,
  getSubmitClickAction,
  values = null,
}) => {
  const [initialValues, setInitialValues] = useState(valuesData);

  const formikRef = useRef(null);

  useEffect(() => {
    if (values) setInitialValues(values);
  }, [values]);

  const resetFormClose = (resetForm) => () => {
    resetForm();
    handleClose();
  };

  const handleSubmit = (resetForm) => () => {
    getSubmitClickAction(formikRef.current?.values);
    resetFormClose(resetForm)();
  }; 

  return (
    <Grid container spacing={10}>
      <Formik
        enableReinitialize
        validateOnBlur
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
        innerRef={formikRef}
      >
        {({ isValid, dirty, resetForm }) => (
          <ModalBase
            open={openDialog}
            onClose={resetFormClose(resetForm)}
            title={title}
            submitButtonLabel={buttonLabel}
            loadingSubmitButton={loading}
            submitButtonDisabled={loading || !isValid || !dirty}
            submitButtonOnClick={handleSubmit(resetForm)}
            closeButtonLabel="Cancelar"
          >
            <Grid item xs={12}>
              <Field
                label="Book title"
                fullWidth
                as={TextField}
                size="small"
                variant="outlined"
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                label="Book author"
                fullWidth
                as={TextField}
                size="small"
                variant="outlined"
                name="author"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                label="Book salida"
                fullWidth
                as={TextField}
                size="small"
                variant="outlined"
                name="edition"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                label="Edicion"
                fullWidth
                as={TextField}
                size="small"
                variant="outlined"
                name="published_year"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                label="Stock"
                fullWidth
                as={TextField}
                size="small"
                variant="outlined"
                name="stock"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                label="Image"
                fullWidth
                as={TextField}
                size="small"
                variant="outlined"
                name="image"
              />
            </Grid>
          </ModalBase>
        )}
      </Formik>
    </Grid>
  );
};

export default BookModal;
