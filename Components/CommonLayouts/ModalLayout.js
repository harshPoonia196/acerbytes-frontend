import { withStyles } from "@mui/styles";
import MuiDialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: "flex",
    justifyContent: "space-Between",
    alignItems: "center",
  },
  closeButton: {
    padding: theme.spacing(1),
    color: theme.palette.grey[500],
    background: "whitesmoke",
  },
  dialogRoot: {
    "& .MuiDialog-paper": {
      maxHeight: 600,
      maxWidth: 600,
      width: "calc(100% - 32px)",
      margin: "1rem",
    },
    [theme.breakpoints.down("md")]: {
      "& .MuiDialog-paper": {
        maxHeight: "calc(100% - 32px)",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiDialog-paper": {
        maxHeight: "80vh",
      },
    },
  },
});

export const Dialog = withStyles(styles)((props) => {
  const { children, classes, open, onClose, ...other } = props;
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      className={classes.dialogRoot}
      {...other}
      maxWidth="sm"
      fullWidth
    >
      {children}
    </MuiDialog>
  );
});

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, transformStyle, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        sx={{ textTransform: transformStyle ? transformStyle : "uppercase" }}
      >
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

export const DialogContent = withStyles((theme) => ({
  root: {
    borderTop: "1px solid gainsboro !important",
    borderBottom: "1px solid gainsboro !important",
    padding: theme.spacing(2),
    paddingTop: "8px !important",
    paddingBottom: theme.spacing(1),
  },
}))(MuiDialogContent);

const A = () => <div></div>;
export default A;
