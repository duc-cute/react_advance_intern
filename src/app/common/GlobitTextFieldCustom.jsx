import React from "react";

import TextField from "@material-ui/core/TextField";
import "../views/Country/CountryStyle.scss";
export default function GlobitTextFieldCustom({
  formik,
  value,
  label,
  name,
  type,
  variant = "outlined",
  placeholder,
  disabled,
  ...props
}) {
  const { errors, touched, handleBlur, handleChange } = formik;

  return (
    <div style={{ width: "100%" }}>
      <TextField
        fullWidth
        name={name}
        // label={name}
        size="small"
        disabled={disabled}
        placeholder={placeholder}
        variant={variant}
        type={type}
        onBlur={handleBlur}
        onChange={handleChange}
        value={formik.values[name]}
        error={touched[name] && Boolean(errors[name])}
        helperText={touched[name] && errors[name]}
        // className="form-custom"
      />
    </div>
  );
}
