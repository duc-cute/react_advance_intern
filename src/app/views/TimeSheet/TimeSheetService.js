import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/timesheet";
const API_PATH_2 = ConstantList.API_ENPOINT + "/api/timesheet";

export const pagingTimeSheet = (searchObject) => {
  var url = API_PATH_2 + "/search-by-page";
  return axios.post(url, searchObject);
};

export const getTimeSheet = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};
export const getTimeSheetByWorkingDate = (workingdate, queries) => {
  const { pageIndex, pageSize } = queries;
  let url = API_PATH + `/workingdate/${workingdate}/${pageSize}/${pageIndex}`;
  return axios.get(url);
};

export const getTimeSheetDetail = (id, queries) => {
  const { pageIndex, pageSize } = queries;

  let url = API_PATH + `/detail/${id}/${pageIndex}/${pageSize}`;
  return axios.get(url);
};

export const createTimeSheet = (obj) => {
  let url = API_PATH_2;
  return axios.post(url, obj);
};

export const editTimeSheet = (obj) => {
  let url = API_PATH_2 + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteTimeSheet = (id) => {
  let url = API_PATH_2 + "/" + id;
  return axios.delete(url);
};
