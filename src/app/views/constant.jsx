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

export const DepartmentSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  code: Yup.string().required("Required"),

  description: Yup.string().required("Required"),
  func: Yup.string().required("Required"),
  industryBlock: Yup.string().required("Required"),
  foundedNumber: Yup.string().required("Required"),
  foundedDate: Yup.string().required("Required"),
  displayOrder: Yup.string().required("Required"),

  description: Yup.string().min(10, "Too Short!").required("Required"),
});
export const columnsCountry = [
  { field: "name", title: "Name" },
  { field: "code", title: "Code" },
  { field: "description", title: "Description", width: 50 },
];

export const pageSizeOption = generateRange(2, 7);

export const typeDepartment = {
  parent: "",
  name: "",
  code: "",
  description: "",
  func: "",
  industryBlock: "",
  foundedNumber: "",
  foundedDate: "",
  displayOrder: "",
};

export const columnsDepart = [
  { field: "code", title: "Mã" },
  {
    field: "name",
    title: "Tên phòng ban",
  },

  { field: "description", title: "Description", width: 50 },
];

export const actionsTableDepart = [
  {
    icon: "save",
    tooltip: "Save User",
  },
];
