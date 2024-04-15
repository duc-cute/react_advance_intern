import { generateRange } from "utils";
import * as Yup from "yup";
export const CountrySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  code: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().min(10, "Too Short!").required("Required"),
});

export const EthnicSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  code: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().min(10, "Too Short!").required("Required"),
});

export const columnsCountry = [
  { field: "name", title: "Name" },
  { field: "code", title: "Code" },
  { field: "description", title: "Description", width: 50 },
];

export const pageSizeOption = generateRange(2, 5);
