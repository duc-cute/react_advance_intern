import React, { useEffect, useState } from "react";
import "../../../styles/custom.scss";
import GlobitsTable from "app/common/GlobitsTable";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import GlobitsSearchInputCustom from "app/common/GlobitsSearchInputCustom";
import { Formik, useFormik } from "formik";
import GlobitsDialogCustom from "app/common/form/GlobitsDialogCustom";
import {
  ProjectSchema,
  columnsProject,
  pageSizeOption,
  typeProject,
} from "../constant";
import DialogActions from "@material-ui/core/DialogActions";
import { observer } from "mobx-react";
import { useStore } from "../../stores";
import GlobitTextFieldCustom from "app/common/GlobitTextFieldCustom";
import { getProjectById } from "./ProjectService";
import GlobitsAutocompleteCustom from "app/common/GlobitsAutoCompleteCustom";

export default observer(function FamilyRelationshipIndex() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataInital, setDataInital] = useState({
    ...typeProject,
  });
  const { projectStore, staffStore } = useStore();
  const {
    loadProjects,
    projectList,
    totalPages,
    count,
    handleAdd,
    handleDelete,
    handleUpdate,
  } = projectStore;
  const { loadAllStaff, staffList } = staffStore;

  const [queries, setQueries] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const formikSearch = useFormik({
    initialValues: { keyword: "" },
    onSubmit: (value) => handleSearch(value),
  });

  const setRowsPerPage = (e) => {
    setQueries((prev) => ({ ...prev, pageSize: e.target.value, pageIndex: 1 }));
  };

  const handleChangePage = (e, number) => {
    setQueries((prev) => ({ ...prev, pageIndex: number }));
  };

  useEffect(() => {
    loadProjects(queries);
  }, [queries]);

  useEffect(() => {
    loadAllStaff();
  }, []);

  const handleSearch = (value) => {
    setQueries((prev) => ({ ...prev, pageIndex: 1, keyword: value.keyword }));
  };

  const actionsTableProject = [
    {
      icon: "edit",
      tooltip: "Update User",
      onClick: async (event, rowData) => {
        const dataUser = await getProjectById(rowData?.id);
        const { id, name, code, description, projectStaff } = dataUser.data;
        setDataInital({
          id,
          name,
          code,
          description,
          projectStaff,
        });
        setOpenModalUpdate(true);
      },
    },
    {
      icon: "delete",
      tooltip: "Delete User",
      onClick: async (event, rowData) => {
        await handleDelete(rowData.id, setQueries, queries);
      },
    },
  ];

  const propsTableProject = {
    data: projectList,
    columns: columnsProject,
    totalElements: count,
    totalPages: totalPages,
    setRowsPerPage: setRowsPerPage,
    title: "Project  Table",
    pageSizeOption: pageSizeOption,
    page: queries.pageIndex,
    actions: actionsTableProject,
    handleChangePage: handleChangePage,
    defaultValueRowsPerPage: queries.pageSize,
  };

  const contentDialog = (
    <>
      <Formik
        initialValues={dataInital}
        onSubmit={async (values, actions) => {
          if (openModal) {
            console.log("v", values);
            await handleAdd(values, setOpenModal, queries);
          } else if (openModalUpdate) {
            await handleUpdate(values, setOpenModalUpdate, queries);
            setDataInital({
              ...typeProject,
            });
          }
        }}
        validationSchema={ProjectSchema}
      >
        {(props) => (
          <form
            onSubmit={props.handleSubmit}
            className="form-add-country"
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,  1fr)",
                width: "100%",
                gap: "12px",
              }}
            >
              <div className="group-field">
                <label>Tên</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="name"
                  placeholder="Enter Name"
                  value={props.values["name"]}
                />
              </div>
              <div className="group-field">
                <label>Mã dự án</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="code"
                  placeholder="Enter code"
                  value={props.values["code"]}
                />
              </div>

              <div className="group-field">
                <label>Chi tiết</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="description"
                  placeholder="Enter description"
                  value={props.values["description"]}
                />
              </div>
              <div className="group-field">
                <label>Nhân viên</label>

                <GlobitsAutocompleteCustom
                  name={"projectStaff"}
                  options={staffList}
                  displayData={"displayName"}
                  defaultValue={props.values["projectStaff"]}
                />
              </div>
            </div>

            <DialogActions style={{ paddingBottom: "24px" }}>
              <Button
                onClick={() => {
                  setOpenModal(false);
                  setOpenModalUpdate(false);
                  setDataInital({ ...typeProject });
                }}
                variant="contained"
                color="secondary"
              >
                Hủy
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Thêm
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </>
  );

  return (
    <div className="staff-wrapper">
      <div className="staff-content">
        <div className="staff-action">
          <h2>Project Table</h2>
          <div className="staff-form">
            <form onSubmit={formikSearch.handleSubmit}>
              <GlobitsSearchInputCustom
                name={"keyword"}
                id={"keyword"}
                placeholder={"Enter search"}
                formik={formikSearch}
              />
            </form>
            <Button
              onClick={() => setOpenModal(true)}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Thêm Project
            </Button>
          </div>
        </div>
        <div className="country-table">
          <GlobitsTable props={propsTableProject} />
        </div>
      </div>
      <GlobitsDialogCustom
        open={openModal}
        setOpen={setOpenModal}
        content={contentDialog}
        title="Thêm Dự án"
        width={800}
      />
      <GlobitsDialogCustom
        open={openModalUpdate}
        setOpen={setOpenModalUpdate}
        content={contentDialog}
        title="Cập nhật Dự án"
        width={800}
      />
    </div>
  );
});
