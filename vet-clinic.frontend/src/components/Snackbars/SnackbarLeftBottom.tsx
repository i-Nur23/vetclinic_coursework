import {Alert, AlertColor, Snackbar} from "@mui/material";
import React from "react";

export const SnackbarLeftBottom = (props : {severety : AlertColor, text : string, open : boolean, setOpen : Function}) =>
  <Snackbar open={props.open} autoHideDuration={4000} onClose={() => props.setOpen(false)}>
    <Alert onClose={() => props.setOpen(false)} severity={props.severety}>
      {props.text}
    </Alert>
  </Snackbar>