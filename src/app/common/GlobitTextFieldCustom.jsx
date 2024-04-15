import React from "react";

import TextField from "@material-ui/core/TextField";
import "../views/Country/CountryStyle.scss";
export default function GlobitTextFieldCustom({
  formik,
  value,
  label,
  name,
  type,
  ...props
}) {
  const { errors, touched, handleBlur, handleChange } = formik;

  return (
    <div style={{ width: "100%" }}>
      {/* {label && (
        <label htmlFor={props.id || name} style={{ marginBottom: "6px" }}>
          {label}
        </label>
      )} */}
      <TextField
        fullWidth
        name={name}
        label={name}
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
