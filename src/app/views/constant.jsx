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
});

export const StaffSchema = Yup.object().shape({
  // lastName: Yup.string().required("Required"),
  // firstName: Yup.string().required("Required"),
  // displayName: Yup.string().required("Required"),
  // gender: Yup.string().required("Required"),
  // birthDate: Yup.string().required("Required"),
  // birthPlace: Yup.string().required("Required"),
  // permanentResidence: Yup.string().required("Required"),
  // currentResidence: Yup.string().required("Required"),
  // email: Yup.string().required("Required"),
  // phoneNumber: Yup.string().required("Required"),
  // idNumber: Yup.string().required("Required"),
  // nationality: Yup.string().required("Required"),
  // ethnics: Yup.string().required("Required"),
  // religion: Yup.string().required("Required"),
  // department: Yup.string().required("Required"),
});
export const columnsCountry = [
  { field: "name", title: "Name" },
  { field: "code", title: "Code" },
  { field: "description", title: "Description", width: 50 },
];

export const pageSizeOption = generateRange(2, 10);

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

export const typeStaff = {
  lastName: "",
  firstName: "",
  displayName: "",
  gender: "",
  birthDate: "",
  birthPlace: "",
  permanentResidence: "",
  currentResidence: "",
  email: "",
  phoneNumber: "",
  idNumber: "",
  nationality: "",
  ethnics: "",
  religion: "",
  department: "",
};

export const typeStaffFamilyRel = {
  fullName: "",
  profession: "",
  birthDate: "",
  familyRelationship: "",
  address: "",
  description: "",
};

export const columnsDepart = [
  { field: "code", title: "Mã" },
  {
    field: "name",
    title: "Tên phòng ban",
  },

  { field: "description", title: "Description", width: 50 },
];

export const columnStaff = [
  { field: "displayName", title: "Họ và tên" },
  {
    field: "birthDate",
    title: "Ngày sinh",
  },
  {
    field: "gender",
    title: "Giới tính",
  },
  {
    field: "department",
    title: "Phòng ban",
  },
  {
    field: "email",
    title: "Email",
  },
  // {
  //   field: "permanentResidence",
  //   title: "Nơi ở thường trú",
  // },
  // {
  //   field: "currentResidence",
  //   title: "Nơi ở hiện tại",
  // },

  {
    field: "phoneNumber",
    title: "Số điện thoại",
  },
  {
    field: "idNumber",
    title: "Mã số",
  },
  {
    field: "nationality",
    title: "Quốc tịch",
  },
];

export const columnStaffFamilyRelShip = [
  { field: "fullName", title: "Tên" },
  {
    field: "profession",
    title: "Nghề nghiệp",
  },
  {
    field: "birthDate",
    title: "Ngày sinh",
  },
  {
    field: "familyRelationship",
    title: "Mối quan hệ",
  },
  { field: "description", title: "Description", width: 50 },
  {
    field: "address",
    title: "Địa chỉ",
  },
];

export const actionsTableDepart = [
  {
    icon: "save",
    tooltip: "Save User",
  },
];

export const gender = [
  {
    value: "F",
    name: "Nữ",
  },
  {
    value: "M",
    name: "Nam",
  },
  {
    value: "U",
    name: "Không rõ",
  },
];
