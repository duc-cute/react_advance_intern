import { action, makeAutoObservable, observable } from "mobx";

import { toast } from "react-toastify";
import {
  createDepartment,
  deleteDepartment,
  editDepartment,
  getListDepartment,
  getTreeView,
  getDepartment,
  pagingAllDepartments,
  pagingDepartments,
} from "./DepartmentService";

export default class DepartmentStore {
  departmentList = [];
  totalPages = 0;
  count = 0;

  constructor(value) {
    makeAutoObservable(this, {
      departmentList: observable,
      loadDepartments: action,
      handleAdd: action,
      handleDelete: action,
      handleUpdate: action,
      getDepartmentById: action,
    });
  }

  loadDepartments = async (queries) => {
    const data = await pagingAllDepartments(queries);
    this.departmentList = data.data?.content;
    this.totalPages = data.data?.totalPages;
    this.count = data.data?.totalElements;
  };
  getDepartmentById = async (id) => {
    const data = await getDepartment(id);
    return data;
  };

  handleAdd = async (values, setOpenModal, setQueries) => {
    console.log("value", values);
    const res = await createDepartment(values);
    if (res.status === 200)
      toast.success(`Tạo thành công department ${res.data.name}`);
    setOpenModal(false);
    setQueries((prev) => ({ ...prev, pageIndex: 1 }));
  };
  handleUpdate = async (newData, setQueries) => {
    try {
      const res = await editDepartment(newData);
      if (res.data) toast.success("Cập nhật thành công!");
      setQueries((prev) => ({ ...prev }));
    } catch (error) {
      toast.error(error.message);
    }
  };
  handleDelete = async (oldData, setQueries, queries) => {
    try {
      const res = await deleteDepartment(oldData?.id);
      if (res.data) toast.success("Xóa thành công!");
      if (this.departmentList.length === 1)
        setQueries((prev) => ({ ...prev, pageIndex: queries.pageIndex - 1 }));
      else setQueries((prev) => ({ ...prev }));
    } catch (error) {
      toast.error(error.message);
    }
  };
}
