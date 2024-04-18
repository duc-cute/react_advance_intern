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
  onChange,
  onBlur,
  ...props
}) {
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
        onBlur={onBlur || formik?.handleBlur}
        onChange={onChange || formik?.handleChange}
        value={value || formik?.values[name]}
        error={formik?.touched[name] && Boolean(formik?.errors[name])}
        helperText={formik?.touched[name] && formik?.errors[name]}
        // className="form-custom"
      />
    </div>
  );
}
