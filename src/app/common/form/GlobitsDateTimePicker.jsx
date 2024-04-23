import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";
import DateFnsUtils from "@date-io/date-fns";
const GlobitsDateTimePicker = ({
  name,
  size,
  format,
  variant,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: "date",
    variant: variant ? variant : "outlined",
    size: size ? size : "small",
    format: format ? format : "MM/dd/yyyy",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker} />;
};

export default GlobitsDateTimePicker;
