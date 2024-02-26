import React from "react";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: 10000,
    width: "50vw",
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  spinner: {
    height: "15vh !important",
    width: "15vh !important",
  },
}));

function PageLoader(props) {
  const { isLoading } = props;

  const classes = useStyles();
  return (
    <>
      {isLoading ? (
        <div className={clsx(classes.container)}>
          <CircularProgress className={clsx(classes.spinner)} />
        </div>
      ) : null}
    </>
  );
}

export default PageLoader;
