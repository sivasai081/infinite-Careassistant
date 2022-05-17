import React ,{Component, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  const classes = useStyles();
  const[endDate, handleEndDate] = useState('');
  const endDateChangeHandler = event => {
    event.persist();
    handleEndDate(event.target.value);
    props.endDate(event.target.value);
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="enddatetime-local"
        label="End Date"
        type="datetime-local"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange = {endDateChangeHandler}
        value={props.enddateValue}
      />
    </form>
  );
}
