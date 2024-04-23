import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useField } from "formik";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: "100%",
  },
}));

const GlobitsTimePickerCustom = ({
  name,
  size,
  format,
  variant,
  step,
  ...otherProps
}) => {
  const classes = useStyles();
  const [field, meta] = useField(name);

  const configTimePicker = {
    ...field,
    ...otherProps,
    type: "time",
    className: classes.textField,
    variant: variant ? variant : "outlined",
    InputLabelProps: {
      shrink: true,
    },
    inputProps: {
      step: step,
    },
    size: "small",
  };

  if (meta && meta.touched && meta.error) {
    configTimePicker.error = true;
    configTimePicker.helperText = meta.error;
  }
  return (
    <form className={classes.container} noValidate>
      <TextField {...configTimePicker} />
    </form>
  );
};
export default GlobitsTimePickerCustom;
