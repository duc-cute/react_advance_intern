import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  ceil: {
    borderBottom: "none",
    padding: "0",
  },
  root: {
    boxShadow: "none",
  },
});

export default function GlobitsTableCustom({ content, columns }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns &&
              columns?.length > 0 &&
              columns.map((col, index) => (
                <TableCell key={index} className={classes.ceil}>
                  {col?.title}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              className={classes.ceil}
              align="center"
              colSpan={columns?.length + 1}
            >
              {content}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
