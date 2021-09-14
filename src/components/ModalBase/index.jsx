import React, { memo, useCallback } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { Info } from "@material-ui/icons";

import useStyles from "./styles";

const CreateModalBase = ({
  open,
  onClose,
  children,
  infoText = "",
  submitButtonLabel,
  closeButtonLabel,
  title = undefined,
  subtitle = undefined,
  submitButtonDisabled = false,
  submitButtonOnClick = undefined,
  loadingSubmitButton = false,
  closeOnlyWithButton = false,
  disableCloseButton = false,
  dedicatedCloseClick = undefined,
  spacing = 1,
}) => {
  const classes = useStyles();

  const getLabel = useCallback(
    () => (typeof submitButtonLabel === "string" ? submitButtonLabel : submitButtonLabel()),
    [submitButtonLabel]
  );

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      disableBackdropClick={closeOnlyWithButton}
      disableEscapeKeyDown={closeOnlyWithButton}
    >
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant="h5">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={spacing}>
          {!!subtitle && (
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.dialogSubtitleText}>
                {subtitle}
              </Typography>
            </Grid>
          )}
          {!!infoText && (
            <Grid item xs={12}>
              <Box display="flex">
                <Info className={classes.infoIcon} />
                <Typography className={classes.infoText}>{infoText}</Typography>
              </Box>
            </Grid>
          )}
          {children}
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={submitButtonDisabled}
          onClick={submitButtonOnClick}
        >
          {getLabel()}
          {loadingSubmitButton && <CircularProgress color="primary" size={24} className={classes.buttonProgress} />}
        </Button>
        <Button
          onClick={dedicatedCloseClick ?? onClose}
          variant="contained"
          size="large"
          className={classes.cancelButton}
          disabled={disableCloseButton}
        >
          {closeButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(CreateModalBase);
