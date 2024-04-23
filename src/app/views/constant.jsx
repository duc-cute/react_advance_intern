import { generateRange } from "utils";
import * as Yup from "yup";
import Chip from "@material-ui/core/Chip";
import moment from "moment";

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

export const TimeSheetSchema = Yup.object().shape({
  project: Yup.string().required("Required"),
  timeSheetStaff: Yup.string().required("Required"),
  workingDate: Yup.string().required("Required"),
  startTime: Yup.string().required("Required"),
  endTime: Yup.string().required("Required"),
  priority: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

export const ProjectSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  code: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  projectStaff: Yup.array().min(1, "required"),
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

export const typeProject = {
  name: "",
  code: "",
  description: "",
  projectStaff: [],
};

export const typeStaffFamilyRel = {
  fullName: "",
  profession: "",
  birthDate: "",
  familyRelationship: "",
  address: "",
  description: "",
};

export const typeTimeSheet = {
  project: "",
  timeSheetStaff: [],
  workingDate: "",
  startTime: "09:00",
  endTime: "18:00",
  priority: "",
  description: "",
};

export const typeTimeSheetDetail = {
  workingItemTitle: "",
  employee: "",
};

export const columnsDepart = [
  { field: "code", title: "Mã" },
  {
    field: "name",
    title: "Tên phòng ban",
  },

  { field: "description", title: "Description", width: 50 },
];
export const columnsProject = [
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
export const columnsTimeSheetDetails = [
  { field: "workingItemTitle", title: "Tiêu đề đầu việc" },
  {
    field: "employee",
    title: "Nhân viên thực hiện",
  },
];

export const columnsTimeSheet = [
  {
    field: "project",
    title: "Công việc",
    render: (rowData) => (
      <span style={{ fontWeight: 600 }}>{rowData?.workingItemTitle}</span>
    ),
  },
  {
    // field: "code",
    title: "Thời gian",
    render: (rowData) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span>
          Thời gian bắt đầu{" "}
          <strong style={{ color: "#01c0c8" }}>
            {moment.utc(rowData.startTime).format("HH:mm DD/MM/YYYY")}
          </strong>
        </span>
        <span>
          Thời gian kết thúc{" "}
          <strong style={{ color: "#01c0c8" }}>
            {moment.utc(rowData.endTime).format("HH:mm DD/MM/YYYY")}
          </strong>
        </span>
        <span>
          Tổng thời gian{" "}
          <strong style={{ color: "#01c0c8" }}>
            {moment.utc(rowData.endTime - rowData.startTime).format("HH")} tiếng
          </strong>
        </span>
      </div>
    ),
  },
  {
    field: "priority",
    title: "Mức độ ưu tiên",
    render: (rowData) => {
      return (
        <Chip
          label={rowData?.priority}
          color={rowData?.priority === "Cấp bách" ? "secondary" : ""}
        />
      );
    },
  },
  {
    field: "employee",
    title: "Người thực giện",
    render: (rowData) => <span>{rowData?.employee}</span>,
  },

  // { field: "code", title: "Người thực hiện" },
];

export const actionsTableDepart = [
  {
    icon: "save",
    tooltip: "Save User",
  },
];

export const genderConstant = [
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
export const priorityConstant = [
  {
    value: 1,
    title: "Thấp",
  },
  {
    value: 2,
    title: "Trung bình",
  },
  {
    value: 3,
    title: "Cao",
  },
  {
    value: 4,
    title: "Cấp bách",
  },
];

export const initQueries = {
  pageIndex: 1,
  pageSize: 10,
};
