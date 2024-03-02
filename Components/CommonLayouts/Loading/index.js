
import React from "react";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import {RotatingLines} from "react-loader-spinner"


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
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  spinner: {
    height: "15vh !important",
    width: "15vh !important",
  },
}));

function Loader(props) {
  const { isLoading } = props;

  const classes = useStyles();
  return (
    <>
      {isLoading ? (
        <div className={clsx(classes.container)}>
          <RotatingLines
  visible={true}
  height="48"
  width="48"
  strokeColor="black"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
 
  className={clsx(classes.spinner)}
  />
          
        </div>
      ) : null}
    </>
  );
}

export default Loader;
