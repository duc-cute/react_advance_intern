import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import { size } from "lodash";

export default function GlobitsDialogCustom({
  setOpen,
  open,
  content,
  title,
  width = 700,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      width: `${width}px!important`,
      padding: "16px 24px",
    },
    title: {
      color: "#fff !important",
      backgroundColor: "#01c0c8",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.title} id="form-dialog-title">
          <span className={classes.title}>{title}</span>
        </DialogTitle>
        <DialogContent className={classes.root}>{content}</DialogContent>
      </Dialog>
    </div>
  );
}
