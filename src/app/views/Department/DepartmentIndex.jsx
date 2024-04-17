import React, { useEffect, useRef, useState } from "react";
import "../../../styles/custom.scss";
import GlobitsTable from "app/common/GlobitsTable";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import GlobitsSearchInputCustom from "app/common/GlobitsSearchInputCustom";
import { useFormik } from "formik";
import GlobitsDialogCustom from "app/common/form/GlobitsDialogCustom";
import {
  DepartmentSchema,
  actionsTableDepart,
  columnsDepart,
  pageSizeOption,
  typeDepartment,
} from "../constant";
import DialogActions from "@material-ui/core/DialogActions";
import { observer } from "mobx-react";
import { useStore } from "../../stores";
import GlobitsRadioCustom from "app/common/GlobitsRadioCustom";
import GlobitTextFieldCustom from "app/common/GlobitTextFieldCustom";

export default observer(function FamilyRelationshipIndex() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDepartment, setOpenModalDepartment] = useState(false);
  const [departmentSelect, setDepartmentSelect] = useState({});
  const [dataSelect, setDataSelect] = useState({});
  const { departmentStore } = useStore();
  const {
    departmentList,
    loadDepartments,
    totalPages,
    count,
    handleAdd,
    handleDelete,
    handleUpdate,
    getDepartmentById,
  } = departmentStore;

  const [queries, setQueries] = useState({
    pageIndex: 1,
    pageSize: 5,
  });

  const formikSearch = useFormik({
    initialValues: { keyword: "" },
    onSubmit: (value) => handleSearch(value),
  });

  const formikSelectDepartment = useFormik({
    initialValues: typeDepartment,
    onSubmit: (values) => {
      let { parent, ...dataOthers } = values;

      if (parent === "") handleAdd(dataOthers, setOpenModal, setQueries);
      else
        handleAdd(
          { ...dataOthers, parent: dataSelect },
          setOpenModal,
          setQueries
        );
    },
    validationSchema: DepartmentSchema,
  });

  const setRowsPerPage = (e) => {
    setQueries((prev) => ({ ...prev, pageSize: e.target.value, pageIndex: 1 }));
  };

  const handleChangePage = (e, number) => {
    setQueries((prev) => ({ ...prev, pageIndex: number }));
  };

  useEffect(() => {
    loadDepartments(queries);
  }, [queries]);

  const editable = {
    onRowUpdate: async (newData) => handleUpdate(newData, setQueries),
    onRowDelete: async (oldData) => handleDelete(oldData, setQueries, queries),
  };
  const editableDialog = {
    onRowAdd: async (newData) => console.log("da", newData),
  };

  const handleSearch = (value) => {
    setQueries((prev) => ({ ...prev, pageIndex: 1, keyword: value.keyword }));
  };

  const handleChangeSelect = async (value) => {
    setDepartmentSelect(value);
  };

  const handleAddSelect = async () => {
    const data = await getDepartmentById(departmentSelect);
    setDataSelect({ ...data?.data });
    formikSelectDepartment.setValues({
      ...typeDepartment,
      parent: data?.data?.name,
    });

    setOpenModalDepartment(false);
  };

  const componentTableDialog = {
    Action: (props) => (
      <GlobitsRadioCustom
        onChange={handleChangeSelect}
        value={props.data.id}
        name="radio-button-demo"
        selectedValue={departmentSelect}
      />
    ),
  };

  const propsTableDepartment = {
    data: departmentList,
    columns: columnsDepart,
    totalElements: count,
    totalPages: totalPages,
    setRowsPerPage: setRowsPerPage,
    editable: editable,
    title: "Department  Table",
    pageSizeOption: pageSizeOption,
    page: queries.pageIndex,
    handleChangePage: handleChangePage,
    defaultValueRowsPerPage: queries.pageSize,
    selection: true,
  };

  const propsTableDialog = {
    data: departmentList,
    columns: columnsDepart,
    totalElements: count,
    totalPages: totalPages,
    setRowsPerPage: setRowsPerPage,
    editable: editableDialog,
    pageSizeOption: pageSizeOption,
    page: queries.pageIndex,
    handleChangePage: handleChangePage,
    components: componentTableDialog,
    actions: actionsTableDepart,
    defaultValueRowsPerPage: queries.pageSize,
  };

  const contentDialogAdd = (
    <>
      <form
        onSubmit={formikSelectDepartment.handleSubmit}
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
          <div className="group-field" style={{ gridColumn: "span 2" }}>
            <label htmlFor="">Đơn vị trực thuộc</label>
            <GlobitTextFieldCustom
              onBlur={formikSelectDepartment.handleBlur}
              onChange={formikSelectDepartment.handleChange}
              formik={formikSelectDepartment}
              name="parent"
              placeholder="Enter parent"
              disabled={true}
            />
          </div>
          <div className="group-field">
            <label htmlFor="">Mã Phòng Ban</label>
            <GlobitTextFieldCustom
              onChange={formikSelectDepartment.handleChange}
              onBlur={formikSelectDepartment.handleBlur}
              name="code"
              placeholder="Enter code"
              formik={formikSelectDepartment}
            />
          </div>
          <div className="group-field">
            <label htmlFor="">Tên Phòng Ban</label>
            <GlobitTextFieldCustom
              onChange={formikSelectDepartment.handleChange}
              onBlur={formikSelectDepartment.handleBlur}
              name="name"
              placeholder="Enter name"
              formik={formikSelectDepartment}
            />
          </div>

          <div className="group-field">
            <label htmlFor="">Miêu tả Chi Tiết</label>
            <GlobitTextFieldCustom
              onChange={formikSelectDepartment.handleChange}
              onBlur={formikSelectDepartment.handleBlur}
              name="description"
              placeholder="Enter description"
              formik={formikSelectDepartment}
            />
          </div>

          <div className="group-field">
            <label htmlFor="">Chức năng</label>
            <GlobitTextFieldCustom
              onChange={formikSelectDepartment.handleChange}
              onBlur={formikSelectDepartment.handleBlur}
              name="func"
              placeholder="Enter function"
              formik={formikSelectDepartment}
            />
          </div>
          <div className="group-field">
            <label htmlFor="">Khối công nghiệp</label>
            <GlobitTextFieldCustom
              onChange={formikSelectDepartment.handleChange}
              onBlur={formikSelectDepartment.handleBlur}
              name="industryBlock"
              placeholder="Enter industry block"
              formik={formikSelectDepartment}
            />
          </div>
          <div className="group-field">
            <label htmlFor="">Số thành lập</label>
            <GlobitTextFieldCustom
              onChange={formikSelectDepartment.handleChange}
              onBlur={formikSelectDepartment.handleBlur}
              name="foundedNumber"
              placeholder="Enter industry block"
              formik={formikSelectDepartment}
            />
          </div>
          <div className="group-field">
            <label htmlFor="">Ngày thành lập</label>
            <GlobitTextFieldCustom
              onChange={formikSelectDepartment.handleChange}
              onBlur={formikSelectDepartment.handleBlur}
              name="foundedDate"
              placeholder="Enter founded date"
              formik={formikSelectDepartment}
            />
          </div>
          <div className="group-field">
            <label htmlFor="">Thứ tự hiển thị</label>
            <GlobitTextFieldCustom
              onChange={formikSelectDepartment.handleChange}
              onBlur={formikSelectDepartment.handleBlur}
              formik={formikSelectDepartment}
              name="displayOrder"
              placeholder="Enter display order"
            />
          </div>
        </div>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
        <Button
          color="primary"
          variant="contained"
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={() => setOpenModalDepartment(true)}
        >
          Lựa chọn
        </Button>
      </form>
    </>
  );

  const contentDialogDepartments = (
    <div
      className="department-content"
      style={{ width: "100%", position: "relative" }}
    >
      <div className="department-action">
        <div className="department-form">
          <form
            onSubmit={formikSearch.handleSubmit}
            className="form-dialog-department"
          >
            <GlobitsSearchInputCustom
              name={"keyword"}
              id={"keyword"}
              placeholder={"Enter search"}
              formik={formikSearch}
            />
          </form>
        </div>
      </div>
      <div className="department-table">
        <GlobitsTable props={propsTableDialog} />
      </div>
      <DialogActions style={{ position: "absolute", bottom: 0, right: 0 }}>
        <Button
          onClick={() => setOpenModalDepartment(false)}
          variant="contained"
          color="secondary"
        >
          Hủy
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleAddSelect}
        >
          Thêm
        </Button>
      </DialogActions>
    </div>
  );

  return (
    <div className="country-wrapper">
      <div className="country-content">
        <div className="country-action">
          <h2>Department Table</h2>
          <div className="country-form">
            <form onSubmit={formikSearch.handleSubmit}>
              <GlobitsSearchInputCustom
                name={"keyword"}
                id={"keyword"}
                placeholder={"Enter search"}
                formik={formikSearch}
              />
            </form>
            <Button
              onClick={() => {
                formikSelectDepartment.resetForm({ values: typeDepartment });
                setOpenModal(true);
              }}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add Department
            </Button>
          </div>
        </div>
        <div className="country-table">
          <GlobitsTable props={propsTableDepartment} />
        </div>
      </div>
      <GlobitsDialogCustom
        open={openModal}
        setOpen={setOpenModal}
        content={contentDialogAdd}
        title="Add Department"
      />
      <GlobitsDialogCustom
        open={openModalDepartment}
        setOpen={setOpenModalDepartment}
        content={contentDialogDepartments}
        title="Lựa Chọn Phòng Ban"
        width={800}
      />
    </div>
  );
});
