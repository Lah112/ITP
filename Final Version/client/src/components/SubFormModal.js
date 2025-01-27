import React, { useState } from "react";
import SubForm from "./SubForm";
import { useNavigate } from "react-router-dom";

import { DialogTitle } from "./CustomDialogTitle";
import {
  Dialog,
  DialogContent,
  Button,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import { useDialogStyles } from "../styles/muiStyles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ReactComponent as Top } from "../svg/top.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DescriptionIcon from '@material-ui/icons/Description';
import FeedbackIcon from '@material-ui/icons/Feedback';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const SubFormModal = ({ type, handleCloseMenu }) => {
  const classes = useDialogStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMenu = () => {
    handleClickOpen();
    handleCloseMenu();
  };

  return (
    <div style={{display:"grid",maxWidth:"100%", justifyContent:"space-around",alignItems: 'center', position: 'relative',}} >
      {type !== "menu" ? (
        <Button
          
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
          fullWidth
          className={classes.createSubBtn}
          size="large"
          startIcon={<AddCircleIcon />}
        >
          Create New
        </Button>
      ) : (
        <MenuItem onClick={handleOpenMenu}>
          <ListItemIcon>
            <AddCircleIcon style={{ marginRight: 7 }} />
            Create
          </ListItemIcon>
        </MenuItem>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        classes={{ paper: classes.dialogWrapper }}
        fullWidth
      >
        <DialogTitle onClose={handleClose}>Create a new</DialogTitle>
        <DialogContent>
          <SubForm />
        </DialogContent>
      </Dialog>
      {type !== "menu" ? (
        <Link to="/leaderboard">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            className={classes.createSubBtn}
            size="large"
            startIcon={<TrendingUpIcon />}
          >
            Leaderboard
          </Button>
        </Link>
      ) : (
        <MenuItem>
          <Link to="/leaderboard">
            <ListItemIcon>
              <TrendingUpIcon style={{ marginRight: 7 }} />
              Leaderboard
            </ListItemIcon>
          </Link>
        </MenuItem>
      )}
    {/*
      {type !== "menu" ? ( // Should move to user settings
        <Link to="/report">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            className={classes.createSubBtn}
            size="large"
            startIcon={<DescriptionIcon />}
          >
            Reports
          </Button>
        </Link>
      ) : (
        <MenuItem>
          <Link to="/report">
            <ListItemIcon>
              <DescriptionIcon style={{ marginRight: 7 }} />
              Report
            </ListItemIcon>
          </Link>
        </MenuItem>
      )}
      
      */}
      {type !== "menu" ? (
        <Link to="/tagmanage">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            className={classes.createSubBtn}
            size="large"
            startIcon={<LocalOfferIcon />}
          >
            Tag Management
          </Button>
        </Link>
      ) : (
        <MenuItem>
          <Link to="/tagmanage">
            <ListItemIcon>
              <LocalOfferIcon style={{ marginRight: 7 }} />
              Tag Management
            </ListItemIcon>
          </Link>
        </MenuItem>
      )}
      {type !== "menu" ? (
        <Link to="/feedback">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            className={classes.createSubBtn}
            size="large"
            startIcon={<FeedbackIcon />}
          >
            FeedBack
          </Button>
        </Link>
      ) : (
        <MenuItem>
          <Link to="/feedback">
            <ListItemIcon>
              <FeedbackIcon style={{ marginRight: 7 }} />
              FeedBack
            </ListItemIcon>
          </Link>
        </MenuItem>
      )}
      {
        type !== "menu" ? (
          <Link to="/article">
            <Button
              color="primary"
              variant="contained"
              fullWidth
              className={classes.createSubBtn}
              size="large"
              startIcon={<TrendingUpIcon />}
            >
              Article
            </Button>
          </Link>
        ) : (
          <MenuItem>
            <Link to="/article">
              <ListItemIcon>
                <AddCircleIcon style={{ marginRight: 7 }} />
                Article
              </ListItemIcon>
            </Link>
          </MenuItem>
        )
      }
      {/* <Link to="/leaderboard">
        <Button
          color="primary"
          variant="contained"
          fullWidth
          className={classes.createSubBtn}
          size="large"
          startIcon={<TrendingUpIcon />}
        >
          Leaderboard
        </Button>
      </Link>
      <Link to="/feedback">
        <Button
          color="primary"
          variant="contained"
          fullWidth
          className={classes.createSubBtn}
          size="large"
          startIcon={<TrendingUpIcon />}
        >
          FeedBack
        </Button>
      </Link>
      <Link to="/tagmanage">
        <Button
          color="primary"
          variant="contained"
          fullWidth
          className={classes.createSubBtn}
          size="large"
          startIcon={<TrendingUpIcon />}
        >
          Tag Management
        </Button>
      </Link> */}
    </div>
  );
};

export default SubFormModal;
