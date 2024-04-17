import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import "../views/Country/CountryStyle.scss";
import "../../styles/custom.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const GlobitsSearchInputCustom = (props) => {
  const classes = useStyles();
  const { formik, name, id, placeholder } = props;
  const { handleChange } = formik;

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ "aria-label": "search google maps" }}
        id={id}
        name={name}
        value={formik.values[name]}
        onChange={handleChange}
        style={{ minWidth: "320px" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default GlobitsSearchInputCustom;
