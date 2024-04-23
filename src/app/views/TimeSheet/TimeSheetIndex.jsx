import React, { useEffect, useRef, useState } from "react";
import "../../../styles/custom.scss";
import GlobitsTable from "app/common/GlobitsTable";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { FieldArray, Formik, useFormik, Form, FormikProvider } from "formik";
import GlobitsDialogCustom from "app/common/form/GlobitsDialogCustom";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  columnsTimeSheet,
  columnsTimeSheetDetails,
  initQueries,
  pageSizeOption,
  priorityConstant,
  typeTimeSheet,
  typeTimeSheetDetail,
} from "../constant";
import DialogActions from "@material-ui/core/DialogActions";
import { observer } from "mobx-react";
import { useStore } from "../../stores";
import GlobitsTableCustom from "app/common/GlobitsTableCustom";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import moment from "moment";
import GlobitsTimePickerCustom from "app/common/GlobitsTimePickerCustom";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { mergedArray } from "utils";
import { getTimeSheet } from "./TimeSheetService";

export default observer(function FamilyRelationshipIndex() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataInital, setDataInital] = useState({
    ...typeTimeSheet,
    details: [{ ...typeTimeSheetDetail }],
  });
  const { timeSheetStore, projectStore } = useStore();
  const {
    totalPages,
    loadTimeSheet,
    timeSheetFormatList,
    count,
    handleAdd,
    handleDelete,
    handleUpdate,
  } = timeSheetStore;
  const { loadProjects, projectList } = projectStore;
  const [queries, setQueries] = useState({ ...initQueries });

  const setRowsPerPage = (e) => {
    setQueries((prev) => ({ ...prev, pageSize: e.target.value, pageIndex: 1 }));
  };

  const handleChangePage = (e, number) => {
    setQueries((prev) => ({ ...prev, pageIndex: number }));
  };

  useEffect(() => {
    loadTimeSheet(queries);
  }, [queries]);

  useEffect(() => {
    const queriesInfo = {
      pageIndex: 1,
      pageSize: 100,
    };
    loadProjects(queriesInfo);
  }, []);

  const actionsTableTimeSheet = [
    {
      icon: "edit",
      tooltip: "Update Time Sheet",
      onClick: async (event, rowData) => {
        const dataTimeSheet = await getTimeSheet(rowData?.id);
        let {
          id,
          startTime,
          endTime,
          workingDate,
          project,
          priority,
          details,
          timeSheetStaff,
          description,
        } = dataTimeSheet.data;
        workingDate = new Date(workingDate).toISOString().slice(0, 10);
        startTime = moment.utc(startTime).format("HH:mm");
        endTime = moment.utc(endTime).format("HH:mm");
        priority = priorityConstant.find((el) => el.value === priority);
        details = details.map((detail) => ({
          employee: detail.employee,
          workingItemTitle: detail.workingItemTitle,
        }));
        setDataInital({
          id,
          startTime,
          endTime,
          workingDate,
          project,
          priority,
          details,
          timeSheetStaff,
          description,
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

  const propsTableTimeSheet = {
    data: mergedArray(timeSheetFormatList),
    columns: columnsTimeSheet,
    totalElements: count,
    totalPages: totalPages,
    setRowsPerPage: setRowsPerPage,
    title: "TimeSheet Table",
    pageSizeOption: pageSizeOption,
    page: queries.pageIndex,
    actions: actionsTableTimeSheet,
    handleChangePage: handleChangePage,
    defaultValueRowsPerPage: queries.pageSize,
  };

  const contentDialog = (
    <>
      <Formik
        initialValues={dataInital}
        onSubmit={async (values, actions) => {
          let { priority, workingDate, startTime, endTime, ...ortherValues } =
            values;
          workingDate = new Date(workingDate).toISOString().slice(0, 10);
          priority = priority.value;
          startTime = workingDate + "T" + startTime + ":00";
          endTime = workingDate + "T" + endTime + ":00";
          if (openModal) {
            await handleAdd(
              { ...ortherValues, priority, startTime, endTime, workingDate },
              setOpenModal,
              queries
            );
          } else if (openModalUpdate) {
            await handleUpdate(
              { ...ortherValues, priority, startTime, endTime, workingDate },
              setOpenModalUpdate,
              queries
            );
            setDataInital({
              ...typeTimeSheet,
              details: [{ ...typeTimeSheetDetail }],
            });
          }
        }}
      >
        {(props) => (
          <Form
            onSubmit={props.handleSubmit}
            className="form-add-country"
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                width: "100%",
                gap: "12px",
              }}
            >
              <div className="group-field">
                <label>Dự Án</label>
                <GlobitsAutocomplete
                  name="project"
                  options={projectList}
                  displayData={"name"}
                  field="project"
                  onChange={(_, value) => {
                    props.setFieldValue("timeSheetStaff", []);
                    props.setFieldValue("project", value);
                  }}
                  value={props.values["project"]}
                />
              </div>
              <div className="group-field">
                <label>Nhân viên</label>
                <GlobitsAutocomplete
                  name={"timeSheetStaff"}
                  options={
                    props.values?.project?.projectStaff ||
                    props.values?.timeSheetStaff ||
                    []
                  }
                  displayData={"displayName"}
                  value={props.values["timeSheetStaff"] || []}
                  multiple={true}
                  onChange={(_, value) => {
                    props.setFieldValue("timeSheetStaff", value);
                  }}
                />
              </div>
              <div className="group-field">
                <label>Ngày làm việc</label>
                <GlobitsDateTimePicker
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="workingDate"
                  placeholder="Enter workingDate"
                  value={props?.values["workingDate"]}
                />
              </div>
              <div className="group-field">
                <label>Thời gian bắt đầu</label>
                <GlobitsTimePickerCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="startTime"
                  placeholder="Enter startTime"
                  value={props?.values.startTime}
                />
              </div>
              <div className="group-field">
                <label>Thời gian kết thúc</label>
                <GlobitsTimePickerCustom
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="endTime"
                  placeholder="Enter endTime"
                  value={props?.values.endTime}
                />
              </div>
              <div className="group-field">
                <label>Mức độ ưu tiên</label>
                <GlobitsAutocomplete
                  name="priority"
                  options={priorityConstant}
                  displayData={"title"}
                  field="priority"
                  value={props.values["priority"]}
                  onChange={(_, value) =>
                    props.setFieldValue("priority", value)
                  }
                />
              </div>
              <div className="group-field">
                <label>Chi Tiết</label>
                <GlobitsTextField
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="description"
                  placeholder="Enter description"
                  value={props.values.description}
                />
              </div>

              <div className="group-field" style={{ gridColumn: "span 2" }}>
                <h3 style={{ fontSize: "24px", margin: "12px 0" }}>
                  Công việc chi tiết
                </h3>

                <FieldArray name="details">
                  {({ insert, remove, push }) => (
                    <>
                      <Button
                        color="primary"
                        variant="contained"
                        style={{
                          maxWidth: "180px",
                          marginBottom: "24px",
                        }}
                        onClick={() => push({ ...typeTimeSheetDetail })}
                      >
                        + Thêm mới công việc
                      </Button>
                      <GlobitsTableCustom
                        columns={columnsTimeSheetDetails}
                        content={
                          <div>
                            {props.values.details?.length > 0 &&
                              props.values.details.map((detail, index) => (
                                <div
                                  key={index}
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3,  1fr)",
                                    width: "100%",
                                    margin: "8px 0",
                                  }}
                                >
                                  <GlobitsTextField
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    name={`details[${index}].workingItemTitle`}
                                    placeholder="Enter description"
                                    value={detail.workingItemTitle}
                                  />

                                  <GlobitsAutocomplete
                                    name={`details[${index}].employee`}
                                    options={
                                      props.values["timeSheetStaff"] || []
                                    }
                                    displayData={"displayName"}
                                    value={detail.employee}
                                    onChange={(_, value) =>
                                      props.setFieldValue(
                                        `details[${index}].employee`,
                                        value
                                      )
                                    }
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
                              ))}
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
                    ...typeTimeSheet,
                    details: [{ ...typeTimeSheetDetail }],
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
          </Form>
        )}
      </Formik>
    </>
  );
  const formikSearch = useFormik({
    initialValues: { projectId: "" },
    onSubmit: (value) => console.log("va", value),
  });

  return (
    <div className="timesheet-wrapper">
      <div className="timesheet-action">
        <h2>TimeSheet Table</h2>
        <div className="timesheet-form">
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Thêm Thời Gian Biểu
          </Button>
        </div>
      </div>
      <div className="timesheet-content">
        <div className="timesheet-search">
          <h3 className="timesheet-search-title">Danh sách dự án</h3>
          <span
            className="timesheet-search-all"
            onClick={() => {
              loadTimeSheet({ ...initQueries });
              formikSearch.setFieldValue("projectId", "");
            }}
          >
            Tất cả
          </span>
          <div className="form-group">
            <FormikProvider value={formikSearch}>
              <GlobitsAutocomplete
                name="projectId"
                id="projectId"
                options={projectList}
                displayData={"name"}
                field="projectId"
                onChange={(_, value) => {
                  formikSearch.setFieldValue("projectId", value);
                  loadTimeSheet({ ...queries, projectId: value?.id });
                }}
                value={formikSearch.values.projectId}
                variant={"standard"}
                label={"Nhập từ khóa"}
              />
            </FormikProvider>
          </div>
        </div>
        <div className="timesheet-list">
          <div className="timesheet-table">
            <GlobitsTable props={propsTableTimeSheet} />
          </div>
        </div>
      </div>
      <GlobitsDialogCustom
        open={openModal}
        setOpen={setOpenModal}
        content={contentDialog}
        title="Thêm Thời Gian Biểu"
        width={1000}
      />
      <GlobitsDialogCustom
        open={openModalUpdate}
        setOpen={setOpenModalUpdate}
        content={contentDialog}
        title="Cập nhật Thời Gian Biểu"
        width={1000}
      />
    </div>
  );
});
