
import React from "react";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { RotatingLines } from "react-loader-spinner"
import colors from "styles/theme/colors";
import { CircularProgress } from "@mui/material";


const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: 1000,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(1,1,1,0.1)",
    backdropFilter: "blur(2px)",
  },
  spinner: {
    // height: "15vh !important",
    // width: "15vh !important",
  },
}));

function Loader() {

  const classes = useStyles();
  return (
    <div className={clsx(classes.container)}>
      <CircularProgress disableShrink sx={{ color: colors.BLACK }} />
    </div>
  );
}

export default Loader;
