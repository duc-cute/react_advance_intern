import { action, makeAutoObservable, observable } from "mobx";
import {
  createCountry,
  deleteCountry,
  editCountry,
  pagingCountries,
} from "./CountryService";
import { toast } from "react-toastify";

export default class CountryStore {
  countryList = [];
  totalPages = 0;
  count = 0;

  constructor(value) {
    makeAutoObservable(this, {
      countryList: observable,
      loadCountries: action,
      handleAddCountry: action,
      handleDelete: action,
      handleUpdate: action,
    });
  }

  loadCountries = async (queries) => {
    const data = await pagingCountries(queries);
    this.countryList = data.data?.content;
    this.totalPages = data.data?.totalPages;
    this.count = data.data?.totalElements;
  };
  handleAddCountry = async (values, setOpenModal, setQueries) => {
    const res = await createCountry(values);
    if (res.status === 200)
      toast.success(`Tạo thành công country ${res.data.name}`);
    setOpenModal(false);
    setQueries((prev) => ({ ...prev, pageIndex: 1 }));
  };
  handleUpdate = async (newData, setQueries) => {
    try {
      const res = await editCountry(newData);
      if (res.data) toast.success("Cập nhật thành công!");
      setQueries((prev) => ({ ...prev }));
    } catch (error) {
      toast.error(error.message);
    }
  };
  handleDelete = async (oldData, setQueries, queries) => {
    try {
      const res = await deleteCountry(oldData?.id);
      if (res.data) toast.success("Xóa thành công!");
      if (this.countryList.length === 1)
        setQueries((prev) => ({ ...prev, pageIndex: queries.pageIndex - 1 }));
      else setQueries((prev) => ({ ...prev }));
    } catch (error) {
      toast.error(error.message);
    }
  };
}
