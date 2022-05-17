import React, {Component, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Datetimepickers(props) {
  const[startDate, handlestartDate] = useState('');
  const classes = useStyles();
  const startDateChangeHandler = event => {
    event.persist();
    props.startDate(event.target.value);
    handlestartDate(event.target.value);
    console.log(event.target.value,"event.target.value")
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="startdatetime-local"
        label="Start Date"
        type="datetime-local"
        placeholder="Start date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange = {startDateChangeHandler}
        value={props.startdateValue}
      />
    </form>
  );
}
