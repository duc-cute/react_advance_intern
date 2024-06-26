import { action, makeAutoObservable, observable, runInAction } from "mobx";

import { toast } from "react-toastify";
import {
  createStaff,
  deleteStaff,
  editStaff,
  getAllStaff,
  pagingStaffs,
} from "./StaffService";
import { genderConstant } from "../constant";
import moment from "moment";

export default class StaffStore {
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
      loadAllStaff: action,
    });
  }

  loadStaff = async (queries) => {
    const data = await pagingStaffs(queries);
    runInAction(() => {
      this.staffList = data.data?.content;
      this.staffListFormat = data.data?.content.map((staff) => ({
        ...staff,
        department: staff.department.name,
        nationality: staff.nationality.name,
        birthDate: moment(staff.birthDate).format("YYYY-MM-DD"),
        gender: genderConstant.find((el) => el.value === staff.gender)?.name,
      }));
      this.totalPages = data.data?.totalPages;
      this.count = data.data?.totalElements;
    });
  };
  loadAllStaff = async () => {
    const data = await getAllStaff();
    runInAction(() => {
      this.staffList = data?.data;
    });
  };

  handleAdd = async (values, setOpenModal, queries) => {
    const res = await createStaff(values);
    this.loadStaff(queries);
    if (res.status === 200) {
      toast.success(`Tạo thành công `);
      setOpenModal(false);
    }
  };
  handleUpdate = async (newData, setOpenModal, queries) => {
    try {
      const res = await editStaff(newData);
      this.loadStaff(queries);
      if (res.data) {
        toast.success("Cập nhật thành công!");
        setOpenModal(false);
      }
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
      else this.loadStaff(queries);
    } catch (error) {
      toast.error(error.message);
    }
  };
}
