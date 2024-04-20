import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/project";
const API_PATH_2 = ConstantList.API_ENPOINT + "/api/project";

export const pagingProject = (searchObject) => {
  var url = API_PATH_2 + "/search-by-page";
  return axios.post(url, searchObject);
};

export const getProject = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};
export const getProjectByDepartment = (queries) => {
  const { pageIndex, pageSize, departmentId } = queries;

  let url = API_PATH + `/department/${departmentId}/${pageIndex}/${pageSize}`;
  return axios.get(url);
};

export const getProjectByDepartmentTree = () => {
  let url = API_PATH + "/departmenttree";
  return axios.get(url);
};

export const createProject = (obj) => {
  let url = API_PATH_2;
  return axios.post(url, obj);
};

export const editProject = (obj) => {
  let url = API_PATH_2 + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteProject = (id) => {
  let url = API_PATH_2 + "/" + id;
  return axios.delete(url);
};

export const checkCode = (id, code) => {
  const config = { params: { id: id, code: code } };
  var url = API_PATH + "/checkCode";
  return axios.get(url, config);
};

export const getAllProject = () => {
  var url = API_PATH_2 + "/all";
  return axios.get(url);
};

export const getProjectById = (id) => {
  var url = API_PATH_2 + "/" + id;
  return axios.get(url);
};
