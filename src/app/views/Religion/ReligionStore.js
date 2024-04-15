import { action, makeAutoObservable, observable } from "mobx";

import { toast } from "react-toastify";
import {
  createReligion,
  deleteReligion,
  editReligion,
  pagingReligions,
} from "./ReligionService";

export default class ReligionStore {
  religionList = [];
  totalPages = 0;
  count = 0;

  constructor(value) {
    makeAutoObservable(this, {
      religionList: observable,
      loadReligions: action,
      handleAdd: action,
      handleDelete: action,
      handleUpdate: action,
    });
  }

  loadReligions = async (queries) => {
    const data = await pagingReligions(queries);
    this.religionList = data.data?.content;
    this.totalPages = data.data?.totalPages;
    this.count = data.data?.totalElements;
  };
  handleAdd = async (values, setOpenModal, setQueries) => {
    const res = await createReligion(values);
    if (res.status === 200)
      toast.success(`Tạo thành công ethnic ${res.data.name}`);
    setOpenModal(false);
    setQueries((prev) => ({ ...prev, pageIndex: 1 }));
  };

  handleUpdate = async (newData, setQueries) => {
    try {
      const res = await editReligion(newData);
      if (res.data) toast.success("Cập nhật thành công!");
      setQueries((prev) => ({ ...prev }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  handleDelete = async (oldData, setQueries, queries) => {
    try {
      const res = await deleteReligion(oldData?.id);
      if (res.data) toast.success("Xóa thành công!");
      if (this.religionList.length === 1)
        setQueries((prev) => ({ ...prev, pageIndex: queries.pageIndex - 1 }));
      else setQueries((prev) => ({ ...prev }));
    } catch (error) {
      toast.error(error.message);
    }
  };
}
