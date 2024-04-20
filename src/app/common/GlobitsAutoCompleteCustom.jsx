/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function GlobitsAutocompleteCustom({
  options,
  name,
  displayData,
  defaultValue,
}) {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const [value, setValue] = useState(defaultValue);

  const handleChange = (_, value) => {
    setFieldValue(name, value);
    setValue(value);
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        size="small"
        limitTags={2}
        id={name}
        options={options}
        onChange={handleChange}
        value={value}
        getOptionLabel={(option) => option[displayData]}
        defaultValue={defaultValue || []}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
      />
    </div>
  );
}
