import React, { useEffect, useRef, useState } from "react";
// import "./CountryStyle.scss";
import GlobitsTable from "app/common/GlobitsTable";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import GlobitsSearchInputCustom from "app/common/GlobitsSearchInputCustom";
import { Formik, useFormik } from "formik";
import GlobitsDialogCustom from "app/common/form/GlobitsDialogCustom";
import { EthnicSchema, pageSizeOption } from "../constant";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import DialogActions from "@material-ui/core/DialogActions";
import SwipeableTemporaryDrawer from "app/common/GlobitsDrawerCustom";
import TextFieldCustom from "app/common/GlobitTextFieldCustom";
import { observer } from "mobx-react";
import { useStore } from "../../stores";

export default observer(function ReligionIndex() {
  const [openModal, setOpenModal] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const { religionStore } = useStore();
  const {
    loadReligions,
    religionList,
    totalPages,
    count,
    handleAdd,
    handleDelete,
    handleUpdate,
  } = religionStore;
  const [dataDes, setDataDes] = useState({
    code: "",
    name: "",
    description: "",
  });

  const [queries, setQueries] = useState({
    pageIndex: 1,
    pageSize: 2,
  });

  const formikSearch = useFormik({
    initialValues: { keyword: "" },
    onSubmit: (value) => handleSearch(value),
  });

  const formikDescription = useFormik({
    initialValues: dataDes,
  });

  const setRowsPerPage = (e) => {
    setQueries((prev) => ({ ...prev, pageSize: e.target.value, pageIndex: 1 }));
    console.log("res", queries);
  };

  const handleChangePage = (e, number) => {
    setQueries((prev) => ({ ...prev, pageIndex: number }));
  };

  useEffect(() => {
    loadReligions(queries);
  }, [queries]);

  const editable = {
    onRowUpdate: async (newData) => handleUpdate(newData, setQueries),
    onRowDelete: async (oldData) => handleDelete(oldData, setQueries, queries),
  };
  const handleSearch = (value) => {
    setQueries((prev) => ({ ...prev, pageIndex: 1, keyword: value.keyword }));
  };

  const handleDrawer = (row) => {
    const { name, code, description } = row;
    setOpenDescription(true);
    setDataDes({ name, code, description });
  };

  useEffect(() => {
    if (dataDes) formikDescription.setValues(dataDes);
  }, [dataDes]);

  const columns = [
    {
      field: "name",
      title: "Name",
      render: (rowData) => (
        <span
          style={{ color: "#7467ef" }}
          onClick={() => handleDrawer(rowData)}
        >
          {rowData.name}
        </span>
      ),
    },
    { field: "code", title: "Code" },
    { field: "description", title: "Description", width: 50 },
  ];

  const propsTableCountry = {
    data: religionList,
    columns: columns,
    totalElements: count,
    totalPages: totalPages,
    setRowsPerPage: setRowsPerPage,
    editable: editable,
    title: "Country Table",
    pageSizeOption: pageSizeOption,
    page: queries.pageIndex,
    handleChangePage: handleChangePage,
    defaultValueRowsPerPage: queries.pageSize,
  };

  const contentDialogAdd = (
    <>
      <Formik
        initialValues={{ name: "", code: "", description: "" }}
        onSubmit={(values) => handleAdd(values, setOpenModal, setQueries)}
        validationSchema={EthnicSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className="form-add-country">
            <div className="group-field">
              <label htmlFor="">Name</label>
              <GlobitsTextField
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
                placeholder="Enter name"
              />
            </div>
            <div className="group-field">
              <label htmlFor="">Code</label>
              <GlobitsTextField
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.code}
                name="code"
                placeholder="Enter code"
              />
            </div>
            <div className="group-field">
              <label htmlFor="">Description</label>
              <GlobitsTextField
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.description}
                name="description"
                placeholder="Enter description"
              />
            </div>
            <DialogActions>
              <Button onClick={() => setOpenModal(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </>
  );

  const contentDrawerDes = (
    <>
      <form className="form-add-country">
        <div className="group-field">
          <TextFieldCustom
            formik={formikDescription}
            name={"name"}
            value={formikDescription.values.name}
          />
        </div>
        <div className="group-field">
          <TextFieldCustom
            formik={formikDescription}
            name={"code"}
            value={formikDescription.values.code}
          />
        </div>
        <div className="group-field">
          <TextFieldCustom
            formik={formikDescription}
            name={"description"}
            value={formikDescription.values.description}
          />
        </div>
      </form>
    </>
  );
  return (
    <div className="country-wrapper">
      <div className="country-content">
        <div className="country-action">
          <h2>Ethnics Table</h2>
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
              onClick={() => setOpenModal(true)}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add Ethnics
            </Button>
          </div>
        </div>
        <div className="country-table">
          <GlobitsTable props={propsTableCountry} />
        </div>
      </div>
      <GlobitsDialogCustom
        open={openModal}
        setOpen={setOpenModal}
        content={contentDialogAdd}
        title="Add Ethnics"
      />
      <SwipeableTemporaryDrawer
        open={openDescription}
        setOpen={setOpenDescription}
        anchor="right"
        content={contentDrawerDes}
        title="Ethnics"
      />
    </div>
  );
});
