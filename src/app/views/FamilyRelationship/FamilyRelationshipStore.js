import { action, makeAutoObservable, observable } from "mobx";

import { toast } from "react-toastify";
import {
  createFamilyRelationship,
  editFamilyRelationship,
  deleteFamilyRelationship,
  pagingFamilyRelationship,
} from "./FamilyRelationshipService";

export default class FamilyRelationshipStore {
  familyRelationList = [];
  totalPages = 0;
  count = 0;

  constructor(value) {
    makeAutoObservable(this, {
      familyRelationList: observable,
      loadFamilyRelationShip: action,
      handleAdd: action,
      handleDelete: action,
      handleUpdate: action,
    });
  }

  loadFamilyRelationShip = async (queries) => {
    const data = await pagingFamilyRelationship(queries);
    this.familyRelationList = data.data?.content;
    this.totalPages = data.data?.totalPages;
    this.count = data.data?.totalElements;
  };

  handleAdd = async (values, setOpenModal, setQueries) => {
    const res = await createFamilyRelationship(values);
    if (res.status === 200)
      toast.success(`Tạo thành công ethnic ${res.data.name}`);
    setOpenModal(false);
    setQueries((prev) => ({ ...prev, pageIndex: 1 }));
  };
  handleUpdate = async (newData, setQueries) => {
    try {
      const res = await editFamilyRelationship(newData);
      if (res.data) toast.success("Cập nhật thành công!");
      setQueries((prev) => ({ ...prev }));
    } catch (error) {
      toast.error(error.message);
    }
  };
  handleDelete = async (oldData, setQueries, queries) => {
    try {
      const res = await deleteFamilyRelationship(oldData?.id);
      if (res.data) toast.success("Xóa thành công!");
      if (this.familyRelationList.length === 1)
        setQueries((prev) => ({ ...prev, pageIndex: queries.pageIndex - 1 }));
      else setQueries((prev) => ({ ...prev }));
    } catch (error) {
      toast.error(error.message);
    }
  };
}
