import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '50%',
    flexDirection: 'column',
    margin: 'auto',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  table: {
    width: '70%',
    margin: 'auto'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  textField: {
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const formValidation = Yup.object().shape({
  partSerialNumber: Yup.string()
    .matches(/^[0-9a-z]+$/).min(6).max(10)
    .required('Required'),
  invoiceNumber: Yup.string().matches(/^[0-9]+$/, 'only numeric values are accepted').test('len', 'At most 6 characters', val => val && val.length <= 6)
    .required('Required'),
  comments: Yup.string().max(240),
  reasonOfReturn: Yup.string(),
})

const endpoint = 'http://127.0.0.1:3000/v1/returnRequests';

export default function ReturnRequestForm(refresh) {


  const [state, setState] = useState(false);
  const [rows, setRows] = useState([]);
  useEffect(async () => {
    await axios.get(endpoint).then(res => {
      setRows(res.data);

    });

  }, [state]);


  const classes = useStyles();
  const formik = useFormik({
    initialValues: { reasonOfReturn: "Broken", invoiceNumber: '', partSerialNumber: '', comments: '', },
    validationSchema: formValidation,
    onSubmit: (values, { resetForm }) => {

      axios.post(endpoint, JSON.stringify(values, null, 2),
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }
        }).then(res => {
          if (res.status === 400) {
            alert(res.data)
          }

          if (res.status === 201) {
            if (refresh) {
              setState(!state)
            }
          }

        });
      resetForm()
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={classes.root} >
        <TextField
          id="invoiceNumber"
          name="invoiceNumber"
          label="Invoice Number"
          className={classes.textField}
          value={formik.values.invoiceNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.invoiceNumber && formik.touched.invoiceNumber}
          helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
        />
        <TextField
          id="partSerialNumber"
          name="partSerialNumber"
          label="Part SerialNumber"
          className={classes.textField}
          value={formik.values.partSerialNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.partSerialNumber && Boolean(formik.errors.partSerialNumber)}
          helperText={formik.touched.partSerialNumber && formik.errors.partSerialNumber}
        />
        <FormControl xs={6} size="medium" variant="standard" sx={{ m: 1, minWidth: 400 }} className={classes.formControl}>
          <InputLabel id="reasonOfReturn-label">Return Reason</InputLabel>
          <Select
            labelId="reasonOfReturn-label"
            id="reasonOfReturn"
            name="reasonOfReturn"
            value={formik.values.reasonOfReturn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value={"Broken"}>Broken</MenuItem>
            <MenuItem value={"Unused"}>Unused</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="comments"
          name="comments"
          label="Comments"
          multiline
          rows={4}
          className={classes.textField}
          value={formik.values.comments}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.comments && Boolean(formik.errors.comments)}
          helperText={formik.touched.comments && formik.errors.comments}
        />
        <Button onClick={formik.handleReset} >
          Reset Form
        </Button>
        <Button type="submit" disabled={formik.isSubmitting} >
          Create New Return Request
        </Button>
      </form>

      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >Part Serial Number</TableCell>
              <TableCell align="right">Invoice Number</TableCell>
              <TableCell align="right">Reason Of Return</TableCell>
              <TableCell align="right">Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={row.partSerialNumber + i}>
                <TableCell component="th" scope="row">
                  {row.partSerialNumber}
                </TableCell>
                <TableCell align="right">{row.invoiceNumber}</TableCell>
                <TableCell align="right">{row.reasonOfReturn}</TableCell>
                <TableCell align="right">{row.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};