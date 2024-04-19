import { action, makeAutoObservable, observable } from "mobx";

import { toast } from "react-toastify";
import {
  createStaff,
  deleteStaff,
  editStaff,
  pagingStaffs,
} from "./StaffService";
import { genderConstant } from "../constant";
import moment from "moment";

export default class EthnicsStore {
  staffList = [];
  staffListFormat = [];
  totalPages = 0;
  count = 0;

  constructor(value) {
    makeAutoObservable(this, {
      staffList: observable,
      staffListFormat: observable,
      loadStaff: action,
      handleAdd: action,
      handleDelete: action,
      handleUpdate: action,
    });
  }

  loadStaff = async (queries) => {
    const data = await pagingStaffs(queries);
    this.staffList = data.data?.content;
    this.staffListFormat = this.staffList.map((staff) => ({
      ...staff,
      department: staff.department.name,
      nationality: staff.nationality.name,
      birthDate: moment(staff.birthDate).format("YYYY-MM-DD"),
      gender: genderConstant.find((el) => el.value === staff.gender)?.name,
    }));
    this.totalPages = data.data?.totalPages;
    this.count = data.data?.totalElements;
  };

  handleAdd = async (values, setOpenModal, setQueries) => {
    const res = await createStaff(values);
    if (res.status === 200) toast.success(`Tạo thành công `);
    setOpenModal(false);
    setQueries((prev) => ({ ...prev, pageIndex: 1 }));
  };
  handleUpdate = async (newData, setQueries) => {
    try {
      const res = await editStaff(newData);
      if (res.data) toast.success("Cập nhật thành công!");
      setQueries((prev) => ({ ...prev }));
    } catch (error) {
      toast.error(error.message);
    }
  };
  handleDelete = async (id, setQueries, queries) => {
    try {
      const res = await deleteStaff(id);
      if (res.data) toast.success("Xóa thành công!");
      if (this.staffList.length === 1)
        setQueries((prev) => ({ ...prev, pageIndex: queries.pageIndex - 1 }));
      else setQueries((prev) => ({ ...prev }));
    } catch (error) {
      toast.error(error.message);
    }
  };
}
