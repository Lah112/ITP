import React, { useState, useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const TagManagementPage = () => {
  const [userTags, setUserTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [editedTag, setEditedTag] = useState({ id: "", name: "" });
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const [openSnack, setOpenSnack] = useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const handleClickOpen = (tag) => {
    setEditedTag(tag); // Set the tag to be edited
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3005/api/tags/${editedTag.id}`, {
        name: editedTag.name,
      })
      .then((response) => {
        const updatedTags = allTags.map((tag) =>
          tag.id === editedTag.id ? response.data : tag
        );
        setAllTags(updatedTags);
        setUserTags(updatedTags.filter((tag) => tag.createdBy === user.id));
        setOpen(false);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "Tag with this name already exists"
        ) { 
          setOpenSnack(true);
        } else {
          alert("Error updating tag. Please try again.");
        }
      });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("readifyUserKey");
    const userObject = JSON.parse(storedUser);
    const userId = userObject.id;
    // Fetch user's tags
    axios
      .get(`http://localhost:3005/api/tags/user/${userId}`)
      .then((response) => {
        setUserTags(response.data);
      })
      .catch((error) => console.error("Error fetching user tags:", error));

    // Fetch all tags
    axios
      .get("http://localhost:3005/api/tags")
      .then((response) => setAllTags(response.data))
      .catch((error) => console.error("Error fetching all tags:", error));
  }, []);

  const handleAddTag = () => {
    axios
      .post("http://localhost:3005/api/tags", {
        name: newTag,
        createdBy: user.id,
      })
      .then((response) => {
        setUserTags([...userTags, response.data]);
        setAllTags([...allTags, response.data]);
        setNewTag("");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "Tag already exists"
        ) {
          setOpenSnack(true);
        } else {
          alert("Error adding tag. Please try again.");
        }
      });
  };

  const handleDeleteTag = (tagId) => {
    axios
      .delete(`http://localhost:3005/api/tags/${tagId}`)
      .then(() => {
        setUserTags(userTags.filter((tag) => tag.id !== tagId));
        setAllTags(allTags.filter((tag) => tag.id !== tagId));
      })
      .catch((error) => console.error("Error deleting tag:", error));
  };

  return (
<div style={{ padding: "0 8em" }}>
  <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
    <h1 style={{marginBottom:'4px'}}>Manage Your Tags</h1>
    <p style={{marginTop:0,marginBottom:"20px",color:'#808080',fontWeight:"600"}}>Here you can manage your tags. You can add, remove, or edit tags.</p>
  </div>
  
  <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    <TextField
      value={newTag}
      onChange={(e) => setNewTag(e.target.value)}
      label="New Tag"
      style={{width:'300px'}}
    />
    <Button onClick={handleAddTag} style={{backgroundColor:'#FF5700',color:'white',position:'relative',top:'5px',width:"100px"}}>Add Tag</Button>
  </div>
  
  {/* User Tags Section */}
  <div>
    <div>
      <h1>Your Tags</h1>
      
    </div>
    <fieldset style={{border:'1px solid #808080',borderRadius:'5px',padding:'10px'}}>
      <legend><h3 style={{marginTop:0,marginBottom:"20px",color:'#808080',fontWeight:"600",position:'relative',top:'7px'}}>Click on a tag to edit it</h3></legend>
    <div>
      {userTags.length > 0 ? (
        userTags.map((tag) => (
          <Chip
          variant="outlined"
            key={tag.id}
            label={tag.name}
            onDelete={() => handleDeleteTag(tag.id)}
            style={{ cursor: "pointer", fontWeight: "bold",margin:'5px',color:'#606060',border:'1px solid #404040' }}
            onClick={() => handleClickOpen(tag)}
          />
        ))
      ) : (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

        <p style={{color:"#909090",fontWeight:'600'}}>No tags available. Add new tags to start managing them.</p>
        </div>
      )}
    </div>
    </fieldset>
  </div>
  
  {/* All Tags Section */}
  <div>
    <h1>All Tags</h1>
    <fieldset style={{border:'1px solid #808080',borderRadius:'5px',padding:'10px'}}>
      <legend><h3 style={{marginTop:0,marginBottom:"20px",color:'#808080',fontWeight:"600",position:'relative',top:'7px'}}>All tags in the system</h3></legend>
    <div>
      {allTags.length > 0 ? (
        allTags.map((tag, index) => (
          <Chip
            key={index}
            label={tag.name}
            style={{ fontWeight: "bold", border: "1px solid black",margin:'5px' }}

          />
        ))
      ) : (
        <p>Still no tags available in the system.</p>
      )}
    </div>
    </fieldset>
  </div>

  {/* Edit Tag Dialog */}
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Tag Update"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        You can update your tag here.
      </DialogContentText>

      <div>
        <TextField
          value={editedTag.name}
          onChange={(e) =>
            setEditedTag({ ...editedTag, name: e.target.value })
          }
          label="Edit Tag"
        />
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleUpdate} color="primary" autoFocus>
        Update
      </Button>
    </DialogActions>
  </Dialog>

  <Snackbar
    open={openSnack}
    autoHideDuration={6000}
    onClose={handleCloseSnack}
  >
    <Alert onClose={handleCloseSnack} severity="error">
      Tag already exists. Please try a different name.
    </Alert>
  </Snackbar>
</div>

  );
};

export default TagManagementPage;
