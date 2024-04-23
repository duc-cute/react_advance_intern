import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useFormikContext, useField } from "formik";
import React, { useEffect } from "react";

const GlobitsAutocomplete = ({
  name,
  options = [],
  displayData,
  variant,
  size,
  isObject,
  properties,
  onChange,
  value,
  label,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configAutocomplete = {
    ...field,
    ...otherProps,
    id: name,
    value: value,
    size: size ? size : "small",
    options: options,
    getOptionLabel: (option) =>
      option[displayData ? displayData : "name"]
        ? option[displayData ? displayData : "name"]
        : "",
    onChange: onChange,

    getOptionSelected: (option, value) => {
      return option?.id === value?.id;
    },
    renderInput: (params) => (
      <TextField
        {...params}
        label={label}
        variant={variant ? variant : "outlined"}
      />
    ),
  };

  if (meta && meta.touched && meta.error) {
    configAutocomplete.error = true;
    configAutocomplete.helperText = meta.error;
  }

  return <Autocomplete {...configAutocomplete} />;
};
export default GlobitsAutocomplete;

// export default function GlobitsAutocomplete(props) {
//   const {
//     name,
//     label,
//     setFieldValue,
//     options,
//     value,
//     defaultValue,
//     displayData,
//     size,
//     variant,
//   } = props;
//   const [field, meta] = useField(props);
//   const onChange = (event, value) => {
//     setFieldValue(props.name, value ? value : null);
//   };

//   return (
//     <>
//       <Autocomplete
//         {...props}
//         {...field}
//         id={name}
//         options={options}
//         getOptionLabel={(option) =>
//           option[displayData ? displayData : "name"]
//             ? option[displayData ? displayData : "name"]
//             : ""
//         }
//         onChange={onChange}
//         value={value}
//         size={size ? size : "small"}
//         defaultValue={defaultValue ? defaultValue : undefined}
//         getOptionSelected={(option, value) => option.id === value.id}
//         filterSelectedOptions
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant={variant ? variant : "outlined"}
//             label={label}
//           />
//         )}
//       />

//       <ErrorMessage component="div" name={name} className="color-red" />
//     </>
//   );
// }
