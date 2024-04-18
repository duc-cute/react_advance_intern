import React, { useEffect, useRef, useState } from "react";
import "../../../styles/custom.scss";
import GlobitsTable from "app/common/GlobitsTable";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import GlobitsSearchInputCustom from "app/common/GlobitsSearchInputCustom";
import { Field, FieldArray, Formik, useFormik } from "formik";
import GlobitsDialogCustom from "app/common/form/GlobitsDialogCustom";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  StaffSchema,
  columnStaff,
  columnStaffFamilyRelShip,
  gender,
  pageSizeOption,
  typeDepartment,
  typeStaff,
  typeStaffFamilyRel,
} from "../constant";
import DialogActions from "@material-ui/core/DialogActions";
import { observer } from "mobx-react";
import { useStore } from "../../stores";
import GlobitTextFieldCustom from "app/common/GlobitTextFieldCustom";
import GlobitsTableCustom from "app/common/GlobitsTableCustom";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";

export default observer(function FamilyRelationshipIndex() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalStaff, setOpenModalStaff] = useState(false);
  const [departmentSelect, setDepartmentSelect] = useState({});
  const [dataSelect, setDataSelect] = useState({});
  const {
    staffStore,
    ethnicsStore,
    countryStore,
    departmentStore,
    familyRelationshipStore,
    religionStore,
  } = useStore();
  const {
    staffList,
    staffListFormat,
    loadStaff,
    totalPages,
    count,
    handleAdd,
    handleDelete,
    handleUpdate,
  } = staffStore;
  const { ethnicsList, loadEthnics } = ethnicsStore;
  const { countryList, loadCountries } = countryStore;
  const { departmentList, loadDepartments } = departmentStore;
  const { familyRelationList, loadFamilyRelationShip } =
    familyRelationshipStore;
  const { religionList, loadReligions } = religionStore;
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
    loadStaff(queries);
  }, [queries]);

  useEffect(() => {
    const queriesInfo = {
      pageIndex: 1,
      pageSize: 10,
    };
    loadCountries(queriesInfo);
    loadDepartments(queriesInfo);
    loadFamilyRelationShip(queriesInfo);
    loadEthnics(queriesInfo);
    loadReligions(queriesInfo);
  }, []);

  const editable = {
    onRowUpdate: async (newData) => handleUpdate(newData, setQueries),
    onRowDelete: async (oldData) => handleDelete(oldData, setQueries, queries),
  };

  const handleSearch = (value) => {
    setQueries((prev) => ({ ...prev, pageIndex: 1, keyword: value.keyword }));
  };

  const propsTableStaff = {
    data: staffList,
    columns: columnStaff,
    totalElements: count,
    totalPages: totalPages,
    setRowsPerPage: setRowsPerPage,
    editable: editable,
    title: "Department  Table",
    pageSizeOption: pageSizeOption,
    page: queries.pageIndex,
    handleChangePage: handleChangePage,
    defaultValueRowsPerPage: queries.pageSize,
  };

  const contentDialogAdd = (
    <>
      <Formik
        initialValues={{
          ...typeStaff,
          familyRelationships: [{ ...typeStaffFamilyRel }],
        }}
        onSubmit={async (values, actions) => {
          let { displayName, gender } = values;
          displayName = `${values.firstName} ${values.lastName}`;
          const res = await handleAdd({
            ...values,
            displayName,
            gender: gender?.value,
          });
          console.log("res", res);
          console.log("va", values);
        }}
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
                gridTemplateColumns: "repeat(3,  1fr)",
                width: "100%",
                gap: "12px",
              }}
            >
              <div className="group-field">
                <label>Họ</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="firstName"
                  placeholder="Enter firstName"
                />
              </div>
              <div className="group-field">
                <label>Tên</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="lastName"
                  placeholder="Enter lastName"
                />
              </div>
              <div className="group-field">
                <label>Tên hiển thị</label>
                <GlobitTextFieldCustom
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  name="displayName"
                  placeholder="Enter displayName"
                  disabled={true}
                  value={`${props.values.firstName} ${props.values.lastName}`}
                />
              </div>

              <div className="group-field">
                <label>Giới tính</label>

                <GlobitsAutocomplete
                  name="gender"
                  options={gender}
                  displayData={"name"}
                  field="gender"
                />
              </div>
              <div className="group-field">
                <label>Ngày Sinh</label>
                <GlobitsDateTimePicker
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="birthDate"
                  placeholder="Enter birthDate"
                />
              </div>
              <div className="group-field">
                <label>Quốc tịch</label>
                <GlobitsAutocomplete
                  name="nationality"
                  options={countryList}
                  displayData={"name"}
                  field="nationality"
                />
              </div>
              <div className="group-field">
                <label>Dân tộc</label>

                <GlobitsAutocomplete
                  name="ethnics"
                  options={ethnicsList}
                  displayData={"name"}
                  field="ethnics"
                />
              </div>
              <div className="group-field">
                <label>Tôn giáo</label>

                <GlobitsAutocomplete
                  name="religion"
                  options={religionList}
                  displayData={"name"}
                  field="religion"
                />
              </div>
              <div className="group-field">
                <label>Phòng Ban</label>

                <GlobitsAutocomplete
                  name="department"
                  options={departmentList}
                  displayData={"name"}
                  field="department"
                />
              </div>
              <div className="group-field">
                <label>Nơi sinh</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="birthPlace"
                  placeholder="Enter birth place"
                />
              </div>
              <div className="group-field">
                <label>Nơi ở thường trú</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="permanentResidence"
                  placeholder="Enter permanent residence"
                />
              </div>
              <div className="group-field">
                <label>Nơi ở hiện tại</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="currentResidence"
                  placeholder="Enter current residence"
                />
              </div>
              <div className="group-field">
                <label>Email</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="group-field">
                <label>Số điện thoại</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="phoneNumber"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="group-field">
                <label>Mã số</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="idNumber"
                  placeholder="Enter id number"
                />
              </div>
              <div className="group-field" style={{ gridColumn: "span 3" }}>
                <h3 style={{ fontSize: "24px", margin: "12px 0" }}>
                  Quan hệ thân nhân
                </h3>

                <FieldArray name="familyRelationships">
                  {({ insert, remove, push }) => (
                    <>
                      <Button
                        color="primary"
                        variant="contained"
                        style={{
                          maxWidth: "180px",
                          marginBottom: "24px",
                        }}
                        onClick={() => push({ ...typeStaffFamilyRel })}
                      >
                        + Thêm mới thân nhân
                      </Button>
                      <GlobitsTableCustom
                        columns={columnStaffFamilyRelShip}
                        content={
                          <div>
                            {props.values.familyRelationships.length > 0 &&
                              props.values.familyRelationships.map(
                                (staffFamily, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(7,  1fr)",
                                      width: "100%",
                                      margin: "8px 0",
                                    }}
                                  >
                                    <GlobitTextFieldCustom
                                      onChange={props.handleChange}
                                      name={`familyRelationships[${index}].fullName`}
                                    />
                                    <GlobitTextFieldCustom
                                      onChange={props.handleChange}
                                      name={`familyRelationships[${index}].profession`}
                                    />

                                    <GlobitsDateTimePicker
                                      onChange={props.handleChange}
                                      name={`familyRelationships[${index}].birthDate`}
                                    />

                                    <GlobitsAutocomplete
                                      name={`familyRelationships[${index}].familyRelationship`}
                                      options={familyRelationList}
                                      displayData={"name"}
                                    />

                                    <GlobitTextFieldCustom
                                      onChange={props.handleChange}
                                      name={`familyRelationships[${index}].address`}
                                    />
                                    <GlobitTextFieldCustom
                                      onChange={props.handleChange}
                                      name={`familyRelationships[${index}].description`}
                                    />

                                    <div
                                      style={{
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <DeleteIcon
                                        color="secondary"
                                        onClick={() => remove(index)}
                                        style={{
                                          width: "100%",
                                        }}
                                      />
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                        }
                      />
                    </>
                  )}
                </FieldArray>
              </div>
            </div>

            <DialogActions style={{ paddingBottom: "24px" }}>
              <Button
                onClick={() => setOpenModal(false)}
                variant="contained"
                color="secondary"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(false)}
              >
                Thêm
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </>
  );

  return (
    <div className="country-wrapper">
      <div className="country-content">
        <div className="country-action">
          <h2>Staff Table</h2>
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
                setOpenModal(true);
              }}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Thêm Nhân Viên
            </Button>
          </div>
        </div>
        <div className="country-table">
          <GlobitsTable props={propsTableStaff} />
        </div>
      </div>
      <GlobitsDialogCustom
        open={openModal}
        setOpen={setOpenModal}
        content={contentDialogAdd}
        title="Thêm Nhân Viên"
        width={1000}
      />
    </div>
  );
});
