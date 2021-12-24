import { TextField, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "../styles";

export default function Input({ label, placeholder, value, onChange }) {
  const classes = useStyles();
  return (
    <div className={classes.inputField}>
      <Typography variant="p" className={classes.inputLabel}>
        {label}
      </Typography>
      <br />
      <TextField
        value={value}
        onChange={onChange}
        id="outlined-basic"
        fullWidth
        variant="outlined"
        className={classes.input}
        placeholder={placeholder}
      />
    </div>
  );
}
