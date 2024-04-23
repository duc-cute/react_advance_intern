import { action, makeAutoObservable, observable, runInAction } from "mobx";

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
      loadDepartments: action,
      handleAdd: action,
      handleDelete: action,
      handleUpdate: action,
      getDepartmentById: action,
    });
  }

  loadDepartments = async (queries) => {
    const data = await pagingAllDepartments(queries);
    runInAction(() => {
      this.departmentList = data.data?.content;
      this.totalPages = data.data?.totalPages;
      this.count = data.data?.totalElements;
    });
  };
  getDepartmentById = async (id) => {
    const data = await getDepartment(id);
    return data;
  };

  handleAdd = async (values, setOpenModal, queries) => {
    const res = await createDepartment(values);
    this.loadDepartments(queries);
    if (res.status === 200) {
      toast.success(`Tạo thành công department ${res.data.name}`);
      setOpenModal(false);
    }
  };
  handleUpdate = async (newData, setOpenModal, queries) => {
    try {
      const res = await editDepartment(newData);
      this.loadDepartments(queries);

      if (res.data) {
        toast.success("Cập nhật thành công!");
        setOpenModal(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  handleDelete = async (oldData, setQueries, queries) => {
    try {
      const res = await deleteDepartment(oldData?.id);
      if (res.data) toast.success("Xóa thành công!");
      if (this.departmentList?.length === 1)
        setQueries((prev) => ({ ...prev, pageIndex: queries.pageIndex - 1 }));
      else this.loadDepartments(queries);
    } catch (error) {
      toast.error(error.message);
    }
  };
}
