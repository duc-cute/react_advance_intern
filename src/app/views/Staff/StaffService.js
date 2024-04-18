import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/staff";
const API_PATH_2 = ConstantList.API_ENPOINT + "/api/staff";

export const pagingStaffs = (searchObject) => {
  var url = API_PATH_2 + "/searchByPage";
  return axios.post(url, searchObject);
};

export const getStaff = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};
export const getStaffsByDepartment = (queries) => {
  const { pageIndex, pageSize, departmentId } = queries;

  let url = API_PATH + `/department/${departmentId}/${pageIndex}/${pageSize}`;
  return axios.get(url);
};

export const getStaffsByDepartmentTree = () => {
  let url = API_PATH + "/departmenttree";
  return axios.get(url);
};

export const createStaff = (obj) => {
  let url = API_PATH_2;
  return axios.post(url, obj);
};

export const editStaff = (obj) => {
  let url = API_PATH_2 + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteStaff = (id) => {
  let url = API_PATH_2 + "/" + id;
  return axios.delete(url);
};

export const checkCode = (id, code) => {
  const config = { params: { id: id, code: code } };
  var url = API_PATH + "/checkCode";
  return axios.get(url, config);
};

export const getAllStaff = () => {
  var url = API_PATH_2 + "/all";
  return axios.get(url);
};
