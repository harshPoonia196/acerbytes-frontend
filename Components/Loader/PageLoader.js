import React from "react";
import "./Spinner.css";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: 10000,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  spinner: {
    height: "15vh",
    width: "15vh",
  },
}));

function PageLoader(props) {
  const { isLoading } = props;

  const classes = useStyles();
  return (
    <>
      {isLoading ? (
        <div className={clsx(classes.container)}>
          <div className={clsx(classes.spinner, "Loader")}>Loading...</div>
        </div>
      ) : null}
    </>
  );
}

export default PageLoader;
