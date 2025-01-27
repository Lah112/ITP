import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Chip,
  TextField,
  IconButton,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import PublishIcon from "@material-ui/icons/Publish";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { usePostFormStyles } from "../styles/muiStyles";
import TitleIcon from "@material-ui/icons/Title";
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ChatIcon from "@material-ui/icons/Chat";
import LinkIcon from "@material-ui/icons/Link";
import PostAddIcon from "@material-ui/icons/PostAdd";
import EditIcon from "@material-ui/icons/Edit";
import { TextInput } from "./FormikMuiFields";
import generateBase64Encode from "../utils/genBase64Encode";
import axios from "axios";
import * as yup from "yup";
import articleService from "../services/article";
import { notify } from "../reducers/notificationReducer";

const validationSchema = yup.object({
  title: yup.string().required("Required"),
  content: yup.string(),
  imageSubmission: yup.string(),
  linkSubmission: yup
    .string()
    .matches(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/,
      "Valid URL required"
    ),
});

const ArticleForm = ({ actionType, fetchData, data }) => {
  const classes = usePostFormStyles();
  const [tags, setTags] = useState(actionType === "edit" ? data.tags : []);
  const [allTags, setAllTags] = useState([]);
  const [fileName, setFileName] = useState("");
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/tags")
      .then((response) => {
        const nameArray = response.data.map((item) => item.name);
        setAllTags(nameArray);
      })
      .catch((error) => console.error("Error fetching all tags:", error));
  }, []);
  const fileInputOnChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFileName(file.name);
    generateBase64Encode(file, setFieldValue);
  };
  const clearFileSelection = (setFieldValue) => {
    setFieldValue("imageSubmission", "");
    setFileName("");
  };
  return (
    <div>
      <Formik
        initialValues={{
          title: actionType === "edit" ? data.title : "",
          category: actionType === "edit" ? data.category : "",
          content: actionType === "edit" ? data.content : "",
          linkSubmission: actionType === "edit" ? data.link : "",
          imageSubmission: "",
          tags: actionType === "edit" ? data.tags : [],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const article = {
            title: values.title,
            category: values.category,
            content: values.content,
            tags: tags,
            linkSubmission: values.linkSubmission,
            imageSubmission: values.imageSubmission,
          };
          if (actionType === "edit") {
            await articleService
              .updateArticle(article, data.id)
              .then(() => {
                dispatch(notify("Article updated", "success"));
                fetchData();
              })
              .catch((error) => {
                dispatch(notify("Error updating article", "error"));
              });
          } else {
            await articleService
              .addNewArticle(article)
              .then(() => {
                dispatch(notify("Article posted", "success"));
                fetchData();
                resetForm();
                setTags([]);
              })
              .catch((error) => {
                dispatch(notify("Error posting article", "error"));
              });
          }
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className={classes.form}>
            <div className={classes.input}>
              <TitleIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="title"
                type="text"
                placeholder="Enter title"
                label="Title"
                required
                fullWidth
                disabled={actionType === "edit"}
              />
            </div>
            <div className={classes.input}>
              <ScatterPlotIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="category"
                type="text"
                placeholder="Enter Category"
                label="Category"
                required
                fullWidth
                value={values.category}
                disabled={actionType === "edit"}
              />
            </div>
            <div
              className={classes.input}
              style={{ display: "flex", alignItems: "center" }}
            >
              <LocalOfferIcon className={classes.inputIcon} color="primary" />

              <Box style={{ flexGrow: 1 }}>
                <Autocomplete
                  multiple
                  id="tags"
                  name="tags"
                  options={allTags}
                  value={tags}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  onChange={(event, value) => {
                    if (value.length <= 5) {
                      setTags(value); // Set selected tags in the state
                    } else {
                      dispatch(
                        notify("You can only select up to 5 tags", "warning")
                      );
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder={
                        tags.length < 5 ? "Enter tags" : "Max 5 tags"
                      }
                      fullWidth
                      name="tags"
                      disabled={tags.length >= 5} // Disable input after reaching 5 tags
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                />
              </Box>
            </div>
            <div className={classes.textInput}>
              <ChatIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="content"
                placeholder="Enter content"
                multiline
                label="Content"
                required
                fullWidth
                variant="outlined"
                rows={4}
                maxRows={Infinity}
              />
            </div>
            <div className={classes.input}>
              <LinkIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="linkSubmission"
                type="text"
                placeholder="Enter Link"
                label="Link"
                required={values.postType === "Link"}
                fullWidth
                variant={actionType === "edit" ? "outlined" : "standard"}
              />
            </div>
            <div className={classes.imageInput}>
              <div className={classes.imageBtnsWrapper}>
                <ImageIcon className={classes.inputIcon} color="primary" />
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  hidden
                  onChange={(e) => fileInputOnChange(e, setFieldValue)}
                  required={values.postType === "Image"}
                />
                <Button
                  component="label"
                  htmlFor="image-upload"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  startIcon={
                    values.imageSubmission ? (
                      <CheckCircleIcon />
                    ) : (
                      <PublishIcon />
                    )
                  }
                  size={isMobile ? "small" : "medium"}
                  className={classes.selectBtn}
                >
                  {values.imageSubmission
                    ? `${isMobile ? "" : "Selected "}"${fileName}"`
                    : `Select Image`}
                </Button>
                {values.imageSubmission && (
                  <IconButton
                    onClick={() => clearFileSelection(setFieldValue)}
                    color="secondary"
                    size={isMobile ? "small" : "medium"}
                    className={classes.clearSelectionBtn}
                  >
                    <CancelIcon />
                  </IconButton>
                )}
              </div>
              {values.imageSubmission && (
                <div className={classes.imagePreview}>
                  <img
                    alt={fileName}
                    src={values.imageSubmission}
                    width={isMobile ? 250 : 350}
                  />
                </div>
              )}
            </div>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              className={classes.submitButton}
              disabled={isSubmitting}
              startIcon={actionType === "edit" ? <EditIcon /> : <PostAddIcon />}
            >
              {actionType === "edit"
                ? isSubmitting
                  ? "Updating"
                  : "Update"
                : isSubmitting
                ? "Posting"
                : "Post"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ArticleForm;
