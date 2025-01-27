import React from "react";
import { useDialogStyles } from "../styles/muiStyles";
import { Dialog } from "@material-ui/core";
import { DialogTitle, DialogContent } from "./CustomDialogTitle";
import ArticleForm from "./ArticleForm";

const ArticleFormModal = ({ open, setOpen, fetchData, actionType, data }) => {
  const classes = useDialogStyles();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.dialogWrapper }}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle onClose={handleClose}>
        {actionType === "edit" ? "Edit Article" : "Add An Article"}
      </DialogTitle>
      <DialogContent>
        <ArticleForm
          actionType={actionType}
          fetchData={fetchData}
          data={data}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ArticleFormModal;
