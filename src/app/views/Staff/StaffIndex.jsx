import React, { useEffect, useRef, useState } from "react";
import "../../../styles/custom.scss";
import GlobitsTable from "app/common/GlobitsTable";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import GlobitsSearchInputCustom from "app/common/GlobitsSearchInputCustom";
import { FieldArray, Formik, useFormik } from "formik";
import GlobitsDialogCustom from "app/common/form/GlobitsDialogCustom";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  columnStaff,
  columnStaffFamilyRelShip,
  genderConstant,
  pageSizeOption,
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
import { getStaff } from "./StaffService";
import moment from "moment";

export default observer(function FamilyRelationshipIndex() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataInital, setDataInital] = useState({
    ...typeStaff,
    familyRelationships: [{ ...typeStaffFamilyRel }],
  });
  const {
    staffStore,
    ethnicsStore,
    countryStore,
    departmentStore,
    familyRelationshipStore,
    religionStore,
  } = useStore();
  const {
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

  const handleSearch = (value) => {
    setQueries((prev) => ({ ...prev, pageIndex: 1, keyword: value.keyword }));
  };

  const actionsTableStaff = [
    {
      icon: "edit",
      tooltip: "Update User",
      onClick: async (event, rowData) => {
        const dataUser = await getStaff(rowData?.id);
        const {
          id,
          firstName,
          lastName,
          displayName,
          birthDate,
          gender,
          department,
          email,
          permanentResidence,
          currentResidence,
          phoneNumber,
          idNumber,
          nationality,
          ethnics,
          religion,
          familyRelationships,
          birthPlace,
        } = dataUser.data;
        let genderFormat = genderConstant.find((el) => el.value === gender);
        let birthDateFormat = new Date(birthDate).toISOString().slice(0, 10);
        let familyRelationshipsFormat = familyRelationships.map((el) => ({
          ...el,
          birthDate: new Date(el?.birthDate).toISOString().slice(0, 10),
        }));
        setDataInital({
          id,
          firstName,
          birthDate: birthDateFormat,
          birthPlace,
          gender: genderFormat,
          department,
          email,
          permanentResidence,
          currentResidence,
          phoneNumber,
          idNumber,
          nationality,
          ethnics,
          religion,
          familyRelationships: familyRelationshipsFormat,
          lastName,
          displayName,
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

  const propsTableStaff = {
    data: staffListFormat,
    columns: columnStaff,
    totalElements: count,
    totalPages: totalPages,
    setRowsPerPage: setRowsPerPage,
    title: "Staff  Table",
    pageSizeOption: pageSizeOption,
    page: queries.pageIndex,
    actions: actionsTableStaff,
    handleChangePage: handleChangePage,
    defaultValueRowsPerPage: queries.pageSize,
  };

  const contentDialog = (
    <>
      <Formik
        initialValues={dataInital}
        onSubmit={async (values, actions) => {
          let { displayName, gender } = values;
          displayName = `${values.firstName} ${values.lastName}`;
          if (openModal) {
            console.log("va", values);
            await handleAdd(
              {
                ...values,
                displayName,
                gender: gender?.value,
              },
              setOpenModal,
              queries
            );
          }
          if (openModalUpdate) {
            await handleUpdate(
              {
                ...values,
                displayName,
                gender: gender?.value,
              },
              setOpenModalUpdate,
              queries
            );
            setDataInital({
              ...typeStaff,
              familyRelationships: [{ ...typeStaffFamilyRel }],
            });
          }
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
                  value={props.values["firstName"]}
                />
              </div>
              <div className="group-field">
                <label>Tên</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="lastName"
                  placeholder="Enter lastName"
                  value={props.values["lastName"]}
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
                  options={genderConstant}
                  displayData={"name"}
                  field="gender"
                  onChange={(_, value) => {
                    props.setFieldValue("gender", value);
                  }}
                  value={props.values["gender"]}
                />
              </div>
              <div className="group-field">
                <label>Ngày Sinh</label>
                <GlobitsDateTimePicker
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="birthDate"
                  placeholder="Enter birthDate"
                  value={props?.values["birthDate"]}
                />
              </div>
              <div className="group-field">
                <label>Quốc tịch</label>
                <GlobitsAutocomplete
                  name="nationality"
                  options={countryList}
                  displayData={"name"}
                  field="nationality"
                  onChange={(_, value) => {
                    props.setFieldValue("nationality", value);
                  }}
                  value={props.values["nationality"]}
                />
              </div>
              <div className="group-field">
                <label>Dân tộc</label>
                <GlobitsAutocomplete
                  name="ethnics"
                  options={ethnicsList}
                  displayData={"name"}
                  field="ethnics"
                  onChange={(_, value) => {
                    props.setFieldValue("ethnics", value);
                  }}
                  value={props.values["ethnics"]}
                />
              </div>
              <div className="group-field">
                <label>Tôn giáo</label>
                <GlobitsAutocomplete
                  name="religion"
                  options={religionList}
                  displayData={"name"}
                  field="religion"
                  onChange={(_, value) => {
                    props.setFieldValue("religion", value);
                  }}
                  value={props.values["religion"]}
                />
              </div>
              <div className="group-field">
                <label>Phòng Ban</label>

                <GlobitsAutocomplete
                  name="department"
                  options={departmentList}
                  displayData={"name"}
                  field="department"
                  onChange={(_, value) => {
                    props.setFieldValue("department", value);
                  }}
                  value={props.values["department"]}
                />
              </div>
              <div className="group-field">
                <label>Nơi sinh</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="birthPlace"
                  placeholder="Enter birth place"
                  value={props.values["birthPlace"]}
                />
              </div>
              <div className="group-field">
                <label>Nơi ở thường trú</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="permanentResidence"
                  placeholder="Enter permanent residence"
                  value={props.values["permanentResidence"]}
                />
              </div>
              <div className="group-field">
                <label>Nơi ở hiện tại</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="currentResidence"
                  placeholder="Enter current residence"
                  value={props.values["currentResidence"]}
                />
              </div>
              <div className="group-field">
                <label>Email</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="email"
                  placeholder="Enter email"
                  value={props.values["email"]}
                />
              </div>
              <div className="group-field">
                <label>Số điện thoại</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={props.values["phoneNumber"]}
                />
              </div>
              <div className="group-field">
                <label>Mã số</label>
                <GlobitTextFieldCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="idNumber"
                  placeholder="Enter id number"
                  value={props.values["idNumber"]}
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
                                      value={staffFamily.fullName}
                                    />
                                    <GlobitTextFieldCustom
                                      onChange={props.handleChange}
                                      name={`familyRelationships[${index}].profession`}
                                      value={staffFamily.profession}
                                    />

                                    <GlobitsDateTimePicker
                                      onChange={props.handleChange}
                                      name={`familyRelationships[${index}].birthDate`}
                                      value={staffFamily.birthDate}
                                    />

                                    <GlobitsAutocomplete
                                      name={`familyRelationships[${index}].familyRelationship`}
                                      options={familyRelationList}
                                      displayData={"name"}
                                      onChange={(_, value) => {
                                        props.setFieldValue(
                                          `familyRelationships[${index}].familyRelationship`,
                                          value
                                        );
                                      }}
                                      value={staffFamily.familyRelationship}
                                    />

                                    <GlobitTextFieldCustom
                                      onChange={props.handleChange}
                                      name={`familyRelationships[${index}].address`}
                                      value={staffFamily.address}
                                    />
                                    <GlobitTextFieldCustom
                                      onChange={props.handleChange}
                                      name={`familyRelationships[${index}].description`}
                                      value={staffFamily.description}
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
                onClick={() => {
                  setOpenModal(false);
                  setOpenModalUpdate(false);
                  setDataInital({
                    ...typeStaff,
                    familyRelationships: [{ ...typeStaffFamilyRel }],
                  });
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
          <h2>Staff Table</h2>
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
        content={contentDialog}
        title="Thêm Nhân Viên"
        width={1000}
      />
      <GlobitsDialogCustom
        open={openModalUpdate}
        setOpen={setOpenModalUpdate}
        content={contentDialog}
        title="Cập nhật Nhân Viên"
        width={1000}
      />
    </div>
  );
});
