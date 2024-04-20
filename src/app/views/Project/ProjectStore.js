import { action, makeAutoObservable, observable } from "mobx";

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
      projectList: observable,
      loadProjects: action,
      handleAdd: action,
      handleDelete: action,
      handleUpdate: action,
    });
  }

  loadProjects = async (queries) => {
    const data = await pagingProject(queries);
    this.projectList = data.data?.content;
    this.totalPages = data.data?.totalPages;
    this.count = data.data?.totalElements;
  };

  handleAdd = async (values, setOpenModal, setQueries) => {
    const res = await createProject(values);
    if (res.status === 200) toast.success(`Tạo thành công `);
    setOpenModal(false);
    setQueries((prev) => ({ ...prev, pageIndex: 1 }));
  };
  handleUpdate = async (newData, setQueries) => {
    try {
      const res = await editProject(newData);
      if (res.data) toast.success("Cập nhật thành công!");
      setQueries((prev) => ({ ...prev }));
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
      else setQueries((prev) => ({ ...prev }));
    } catch (error) {
      toast.error(error.message);
    }
  };
}
