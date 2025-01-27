import React, { useState, useEffect } from "react";
import { useArticleViewStyles } from "../styles/muiStyles";
import { useLocation, useHistory } from "react-router-dom"; 
import dayjs from "dayjs";
import ArticleFormModal from "./ArticleFormModal";
import { Button, Dialog, DialogTitle } from "@material-ui/core";
import { DialogActions } from "./CustomDialogTitle";
import { Edit, Delete } from "@material-ui/icons";
import articleService from "../services/article";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch } from "react-redux";
import { notify } from "../reducers/notificationReducer";

const ArticleViewPage = () => {
  const classes = useArticleViewStyles();
  const location = useLocation();
  const history = useHistory(); 
  const dispatch = useDispatch();

  const { articleData } = location.state || {}; 
  const [fetchedData, setFetchedData] = useState();
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchData = async () => {
    const response = await articleService.getArticleById(articleData.id);
    setFetchedData(response);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!articleData) history.push("/article"); // Redirect to articles page if no article data
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await articleService.deleteArticle(articleData.id);
      history.push("/article"); // Redirect to articles page after deletion
    } catch (error) {
       dispatch(notify("Error Deleting Article", "error"));
    }
  };

  // Get user data from local storage
  const userString = localStorage.getItem("readifyUserKey");
  // convert to JSON
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!isLoaded ? (
        <LoadingSpinner text={"Fetching articles. Wait a sec."} />
      ) : (
        <div className={classes.container}>
          {/* edit delete button */}
          {fetchedData &&
            fetchedData.author &&
            user &&
            articleData.author.id === user.id && (
              <div className={classes.editDeleteBtn}>
                <Button
                  onClick={() => setDeleteOpen(true)}
                  startIcon={
                    <Delete
                      style={{
                        color: "red",
                      }}
                    />
                  }
                >
                  Delete
                </Button>
                <Button onClick={() => setOpen(true)} startIcon={<Edit />}>
                  Edit
                </Button>
              </div>
            )}
          <h1>{fetchedData && fetchedData.title}</h1>
          <div className={classes.middleContainer}>
            {fetchedData &&
              fetchedData.image &&
              fetchedData.image.imageLink &&(
                <img
                  src={fetchedData.image.imageLink}
                  alt="Article"
                  className={classes.articleViewImg}
                />
              )}

            <div>
              <p>{fetchedData && fetchedData.content}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {fetchedData &&
                  fetchedData.tags.map((tag) => (
                    <p key={tag} className={classes.articleTag}>
                      #{tag}
                    </p>
                  ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  marginTop: 10,
                }}
              >
                <p className={classes.articleViewAuthor}>
                  Category : {fetchedData && fetchedData.category}
                </p>
                <p>
                  Link:{" "}
                  <a
                    href={fetchedData ? `https://${fetchedData.link}` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {fetchedData ? fetchedData.link : "Loading..."}
                  </a>
                </p>
                <p className={classes.articleViewAuthor}>
                  Author : {fetchedData && fetchedData.author.username}
                </p>
                <p className={classes.articleViewDate}>
                  {fetchedData &&
                    dayjs(fetchedData.updatedAt).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <ArticleFormModal
        open={open}
        setOpen={setOpen}
        data={fetchedData}
        actionType="edit"
        fetchData={fetchData}
      />
      <ConfrimationModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ArticleViewPage;

const ConfrimationModal = ({ open, setOpen, handleDelete }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Are you sure you want to delete this article?</DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
