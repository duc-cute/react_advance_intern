import { action, makeAutoObservable, observable, runInAction } from "mobx";

import { toast } from "react-toastify";
import {
  checkCode,
  createProject,
  deleteProject,
  editProject,
  getAllProject,
  getProjectByDepartment,
  getProjectByDepartmentTree,
  getProjectById,
  pagingProject,
} from "./ProjectService";

export default class EthnicsStore {
  projectList = [];
  totalPages = 0;
  count = 0;

  constructor(value) {
    makeAutoObservable(this, {
      loadProjects: action,
      handleAdd: action,
      handleDelete: action,
      handleUpdate: action,
      loadAllProject: action,
    });
  }

  loadProjects = async (queries) => {
    const data = await pagingProject(queries);
    runInAction(() => {
      this.projectList = data.data?.content;
      this.totalPages = data.data?.totalPages;
      this.count = data.data?.totalElements;
    });
  };

  handleAdd = async (values, setOpenModal, queries) => {
    const res = await createProject(values);
    this.loadProjects(queries);
    if (res.status === 200) {
      toast.success(`Tạo thành công `);
      setOpenModal(false);
    }
  };
  handleUpdate = async (newData, setOpenModal, queries) => {
    try {
      const res = await editProject(newData);
      this.loadProjects(queries);

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
      const res = await deleteProject(id);
      if (res.data) toast.success("Xóa thành công!");
      if (this.projectList.length === 1)
        setQueries((prev) => ({ ...prev, pageIndex: queries.pageIndex - 1 }));
      else this.loadProjects(queries);
    } catch (error) {
      toast.error(error.message);
    }
  };
}
