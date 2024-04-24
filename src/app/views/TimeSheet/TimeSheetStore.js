import { action, makeAutoObservable, observable, runInAction } from "mobx";

import { toast } from "react-toastify";
import {
  createTimeSheet,
  deleteTimeSheet,
  editTimeSheet,
  getTimeSheet,
  getTimeSheetByWorkingDate,
  getTimeSheetDetail,
  pagingTimeSheet,
} from "./TimeSheetService";
import moment from "moment";
import { priorityConstant } from "../constant";

export default class TimeSheetStore {
  timeSheetList = [];
  timeSheetFormatList = [];
  totalPages = 0;
  count = 0;

  constructor(value) {
    makeAutoObservable(this, {
      loadStaff: action,
      handleAdd: action,
      handleDelete: action,
      handleUpdate: action,
    });
  }

  loadTimeSheet = async (queries) => {
    const data = await pagingTimeSheet(queries);
    runInAction(() => {
      this.timeSheetList = data.data?.content;
      this.timeSheetFormatList = data.data?.content.map((timesheet) => {
        return timesheet.details.map((detail) => ({
          ...timesheet,
          priority: priorityConstant.find(
            (el) => el.value === timesheet.priority
          )?.title,
          workingItemTitle: detail.workingItemTitle,
          employee: detail.employee?.displayName,
          idDetail: detail?.id,
        }));
      });

      this.totalPages = data.data?.totalPages;
      this.count = data.data?.totalElements;
    });
  };

  handleAdd = async (values, setOpenModal, queries) => {
    const res = await createTimeSheet(values);
    this.loadTimeSheet(queries);
    if (res.status === 200) {
      toast.success(`Tạo thành công `);
      setOpenModal(false);
    }
  };
  handleUpdate = async (newData, setOpenModal, queries) => {
    try {
      const res = await editTimeSheet(newData);
      this.loadTimeSheet(queries);
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
      const res = await deleteTimeSheet(id);
      if (res.data) toast.success("Xóa thành công!");
      if (this?.timeSheetList?.length === 1)
        setQueries((prev) => ({ ...prev, pageIndex: queries.pageIndex - 1 }));
      else this.loadTimeSheet(queries);
    } catch (error) {
      toast.error(error.message);
    }
  };
}
