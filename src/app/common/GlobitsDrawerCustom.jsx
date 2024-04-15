import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import "../views/Country/CountryStyle.scss";

const useStyles = makeStyles({
  list: {
    width: 500,
  },
  fullList: {
    width: "auto",
  },
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const { anchor, content, open, setOpen, title } = props;

  return (
    <div className="">
      <SwipeableDrawer
        anchor={anchor}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div className="drawer-custom">
          <h2 className="title-drawer">{title} Description</h2>
          {content}
        </div>
      </SwipeableDrawer>
    </div>
  );
}
