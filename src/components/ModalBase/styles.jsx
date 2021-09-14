import { makeStyles } from "@material-ui/core";

export default makeStyles({
  dialogTitle: {
    paddingBottom: 0,
  },
  dialogSubtitleText: {
    fontSize: "1.125rem",
  },
  infoIcon: {
    fontSize: "1.75rem",
  },
  infoText: {
    whiteSpace: "pre-wrap",
    marginLeft: 8,
  },
  dialogActions: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16,
    "& > :first-child": {
      minWidth: "calc(50% - 12px)",
    },
    "& > :last-child": {
      marginLeft: 24,
      flex: 1,
      maxWidth: "calc(50% - 12px)",
    },
  },
  cancelButton: {
    color: "white",
    background: "#cac9c9",
    "&:hover": {
      backgroundColor: "#b1b1b1",
    },
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});
