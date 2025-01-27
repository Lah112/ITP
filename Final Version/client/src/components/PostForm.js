import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextInput } from "./FormikMuiFields";
import generateBase64Encode from "../utils/genBase64Encode";
import { createNewPost, updatePost } from "../reducers/postCommentsReducer";
import { notify } from "../reducers/notificationReducer";
import * as yup from "yup";
import AlertMessage from "./AlertMessage";
import getErrorMsg from "../utils/getErrorMsg";
import { Cancel } from "@material-ui/icons";
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
  Box,
} from "@material-ui/core";
import { usePostFormStyles } from "../styles/muiStyles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTheme } from "@material-ui/core/styles";
import TitleIcon from "@material-ui/icons/Title";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import ImageIcon from "@material-ui/icons/Image";
import LinkIcon from "@material-ui/icons/Link";
import PublishIcon from "@material-ui/icons/Publish";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ChatIcon from "@material-ui/icons/Chat";
import PostAddIcon from "@material-ui/icons/PostAdd";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";

const validationSchema = yup.object({
  title: yup.string().required("Required"),
  textSubmission: yup.string(),
  imageSubmission: yup.string(),
  linkSubmission: yup
    .string()
    .matches(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/,
      "Valid URL required"
    ),
});

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      style={{
        background: "#283240",
        height: "100%",
        width: "fit-content",
        display: "flex",
        padding: "0.4rem",
        margin: "0.5rem 0.5rem 0 0",
        justifyContent: "center",
        alignItems: "center", // Ensures the items are centered vertically
        color: "#ffffff",
        borderRadius: "0.5rem",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography>{data}</Typography>
        <Cancel
          style={{ cursor: "pointer", marginLeft: "0.5rem" }} // Add some spacing between text and icon
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Box>
    </Box>
  );
};

const AddPostForm = ({
  postType,
  actionType,
  postToEditType,
  postToEditTitle,
  postToEditTag,
  postToEditSub,
  postToEditId,
  textSubmission,
  linkSubmission,
  fromSubreddit,
  postToEditCategory,
}) => {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);
  const { subs } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = usePostFormStyles();

  const [tags, setTags] = useState([]);
  const tagRef = useRef();
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/tags")
      .then((response) => setAllTags(response.data)) // Store the fetched tags in state
      .catch((error) => console.error("Error fetching all tags:", error));
  }, []);

  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };

  const fileInputOnChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFileName(file.name);
    generateBase64Encode(file, setFieldValue);
  };

  const clearFileSelection = (setFieldValue) => {
    setFieldValue("imageSubmission", "");
    setFileName("");
  };

  const handleAddPost = async (values, { setSubmitting }) => {
    console.log("values", values);
    try {
      setSubmitting(true);
      const postId = await dispatch(createNewPost(values));
      setSubmitting(false);
      history.push(`/comments/${postId}`);
      dispatch(notify("Added new post!", "success"));
    } catch (err) {
      setSubmitting(false);
      setError(getErrorMsg(err));
    }
  };

  const handleUpdatePost = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await dispatch(updatePost(postToEditId, values));
      setSubmitting(false);
      history.push(`/comments/${postToEditId}`);
      dispatch(notify("Successfully updated the post!", "success"));
    } catch (err) {
      setSubmitting(false);
      setError(getErrorMsg(err));
    }
  };

  console.log("postToEdittag", postToEditTag);

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          title: actionType === "edit" ? postToEditTitle : "",
          // category: actionType === "edit" ? postToEditCategory : "",
          postType: actionType === "edit" ? postToEditType : postType,
          textSubmission: actionType === "edit" ? textSubmission : "",
          linkSubmission: actionType === "edit" ? linkSubmission : "",
          imageSubmission: "",
          subreddit:
            actionType === "edit"
              ? postToEditSub.id
              : !fromSubreddit
              ? ""
              : fromSubreddit.id,
          tags: tags,
          category: actionType === "edit" ? postToEditCategory : "",
        }}
        // onSubmit={actionType === "edit" ? handleUpdatePost : handleAddPost}
        onSubmit={async (values, { setSubmitting }) => {
          values.tags = tags; // Add the tags before submitting
          actionType === "edit"
            ? await handleUpdatePost(values, { setSubmitting })
            : await handleAddPost(values, { setSubmitting });
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={classes.form}>
            {actionType !== "edit" && (
              <ButtonGroup
                color="secondary"
                fullWidth
                className={classes.typeBtnGroup}
              >
                <Button
                  onClick={() => setFieldValue("postType", "Text")}
                  variant={
                    values.postType === "Text" ? "contained" : "outlined"
                  }
                >
                  <TextFormatIcon style={{ marginRight: 2 }} />
                  Text
                </Button>
                <Button
                  onClick={() => setFieldValue("postType", "Image")}
                  variant={
                    values.postType === "Image" ? "contained" : "outlined"
                  }
                >
                  <ImageIcon style={{ marginRight: 5 }} />
                  Image
                </Button>
                <Button
                  onClick={() => setFieldValue("postType", "Link")}
                  variant={
                    values.postType === "Link" ? "contained" : "outlined"
                  }
                >
                  <LinkIcon style={{ marginRight: 5 }} />
                  Link
                </Button>
              </ButtonGroup>
            )}
            <div className={classes.input}>
              <Typography
                className={classes.inputIconText}
                color="primary"
                variant="h5"
              >
                r/
              </Typography>
              <Autocomplete
                name="subreddit"
                onChange={(e, value) =>
                  setFieldValue("subreddit", value ? value.id : "")
                }
                fullWidth
                options={subs && subs.allSubs}
                disabled={actionType === "edit" || !!fromSubreddit}
                getOptionLabel={(option) => option.subredditName}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      actionType === "edit"
                        ? postToEditSub.subredditName
                        : !fromSubreddit
                        ? "Choose a subreddish"
                        : fromSubreddit.subredditName
                    }
                    placeholder="Search by name"
                    required
                    disabled={actionType === "edit" || !!fromSubreddit}
                  />
                )}
              />
            </div>
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
            {values.postType === "Text" && (
              <div className={classes.input}>
                <ScatterPlotIcon
                  className={classes.inputIcon}
                  color="primary"
                />
                <TextInput
                  name="category"
                  type="text"
                  placeholder="Enter Category"
                  label="Category"
                  required
                  fullWidth
                  value={values.category} // Pre-fill with the existing category
                  disabled={actionType === "edit"}
                />
              </div>
            )}
            {/* <div
              className={classes.input}
              style={{ display: "flex", alignItems: "center" }}
            >
              <LocalOfferIcon className={classes.inputIcon} color="primary" />
              {actionType === "edit" ?(
                <Typography style={{marginTop:5,marginBottom:5}}>
                  {postToEditTag.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      color="darkgray"
             
                      className={classes.tagBtn}
                      style={{ marginRight: 5 }}
                    />
                  ))}
              
                </Typography>):(
              <Box style={{ flexGrow: 1 }}>
                <TextField
                  name="tags"
                  inputRef={tagRef}
                  fullWidth
                  variant="standard"
                  size="small"
                  style={{ margin: "1rem 0" }}
                  placeholder={tags.length < 5 ? "Enter tags" : ""}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      tagRef.current.value &&
                      !tags.includes(tagRef.current.value)
                    ) {
                      e.preventDefault(); // Prevents form submission or page reload
                      setTags([...tags, tagRef.current.value]);
                      tagRef.current.value = ""; // Clear input
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        style={{ margin: "0 0.2rem 0 0" }}
                      >
                        {tags.map((data, index) => (
                          <Tags
                            data={data}
                            handleDelete={handleDelete}
                            key={index}
                          />
                        ))}
                      </Box>
                    ),
                  }}
                />
              </Box>)}
            </div> */}
            <div
              className={classes.input}
              style={{ display: "flex", alignItems: "center" }}
            >
              <LocalOfferIcon className={classes.inputIcon} color="primary" />
              {actionType === "edit" ? (
                <Typography style={{ marginTop: 5, marginBottom: 5 }}>
                {postToEditTag && postToEditTag.length > 0 ? (
                  postToEditTag.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      className={classes.tagBtn}
                      style={{ marginRight: 5, backgroundColor: 'darkgray', color: 'white' }} // Manually applying the 'darkgray' color
                    />
                  ))
                ) : (
                  <Typography>No tags available</Typography> // Optional: Add a fallback message if there are no tags
                )}
              </Typography>
              ) : (
                <Box style={{ flexGrow: 1 }}>
                  <Autocomplete
                    multiple
                    id="tags"
                    options={allTags}
                    getOptionLabel={(option) => option.name} // Assuming each tag object has a 'name' property
                    filterSelectedOptions
                    onChange={(event, value) => {
                      setTags(value.map((tag) => tag.name)); // Set selected tags in the state
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder={tags.length < 5 ? "Enter tags" : ""}
                        fullWidth
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option.name}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                  />
                </Box>
              )}
            </div>

            {values.postType === "Text" && (
              <div className={classes.textInput}>
                <ChatIcon className={classes.inputIcon} color="primary" />
                <TextInput
                  name="textSubmission"
                  placeholder={`Enter text (HTML supported. For ex, "<h1>Like this?</h1>")`}
                  multiline
                  label="Text"
                  required={values.postType === "Text"}
                  fullWidth
                  variant="outlined"
                  rows={4}
                  maxRows={Infinity}
                />
              </div>
            )}
            {values.postType === "Image" && (
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
            )}
            {values.postType === "Link" && (
              <div className={classes.input}>
                <LinkIcon className={classes.inputIcon} color="primary" />
                <TextInput
                  name="linkSubmission"
                  type="text"
                  placeholder="Enter URL"
                  label="Link"
                  required={values.postType === "Link"}
                  fullWidth
                  variant={actionType === "edit" ? "outlined" : "standard"}
                />
              </div>
            )}
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              className={classes.submitButton}
              disabled={isSubmitting}
              startIcon={postToEditId ? <EditIcon /> : <PostAddIcon />}
            >
              {postToEditId
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
      <AlertMessage
        error={error}
        severity="error"
        clearError={() => setError(null)}
      />
    </div>
  );
};

export default AddPostForm;
