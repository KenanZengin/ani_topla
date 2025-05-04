"use client";

import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAppContext } from "./context";


const GlobalSnackbar = () => {


    const {globalSnackBar, setGlobalSnackbar} = useAppContext();
    
    return (
    <Snackbar
      open={globalSnackBar.state}
      autoHideDuration={4000}
      onClose={() => setGlobalSnackbar({...globalSnackBar,state: false})}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={() => setGlobalSnackbar(false)} severity={globalSnackBar.mode} sx={{ width: "100%" }}>
        {globalSnackBar.mess || ""}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
