import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import { useNavStyles } from "../styles/muiStyles";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { Cancel } from "@material-ui/icons";
import { Box, Typography } from "@material-ui/core";

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      style={{
        background: "#283240",
        height: "100%",
        display: "flex",
        padding: "0.4rem",
        margin: "0.5rem 0.5rem 0.5rem 0",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        borderRadius: "0.5rem",
        whiteSpace: "nowrap", // Ensure the tag text does not wrap
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        width={"auto"}
      >
        <Typography>{data}</Typography>
        <Cancel
          style={{ cursor: "pointer", marginLeft: "0.5rem" }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Box>
    </Box>
  );
};

const SearchBar = ({ isMobile, setSearchOpen }) => {
  const [searchInput, setSearchInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tagActive, setTagActive] = useState(false);
  const tagRef = useRef();
  const history = useHistory();
  const classes = useNavStyles();

  const toggleBars = () => {
    setTagActive(!tagActive); // Toggles between tag input and search input
  };

  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (tagRef.current.value && !tags.includes(tagRef.current.value)) {
      setTags([...tags, tagRef.current.value]);
      tagRef.current.value = "";
    }

    if (tags.length > 0) {
      // Redirect to tag-based search results page
      history.push(`/tags/${tags.join(',')}`);

    }

  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput === "") return;
    history.push(`/search/${searchInput}`);
  };

  const clearSearch = () => {
    if (isMobile) {
      setSearchOpen(false);
    }
    setSearchInput("");
  };

  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 8 }}>
      {tagActive ? (
        <div className={classes.search} style={{ flexGrow: 1 }}>
          <form onSubmit={handleOnSubmit}>
            <Box
              display="flex"
              flexWrap="wrap"
              alignItems="center"
              style={{
                border: "1px solid #ccc",
                borderRadius: "0.5rem",
                padding: "0.5rem",
              }}
            >
              {tags.map((data, index) => (
                <Tags data={data} handleDelete={handleDelete} key={index} />
              ))}
              <TextField
                name="tags"
                inputRef={tagRef}
                variant="outlined"
                size="small"
                placeholder={tags.length < 5 ? "Enter tags" : ""}
                style={{ flexGrow: 1, minWidth: "120px" }} // Dynamic input width
                InputProps={{
                  style: {
                    padding: 0,
                    paddingLeft: "0.5rem", // Align with tags padding
                  },
                  endAdornment:  (
                    <InputAdornment position="end" style={{cursor:"pointer" ,marginRight:10}}>
                      <IconButton type="submit">
                      <SearchIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </form>
        </div>
      ) : (
        <div className={classes.search} style={{ flexGrow: 1 }}>
          <form onSubmit={handleSearch} style={{ position: "relative" }}>
            <TextField
              type="search"
              placeholder="Search for posts…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={classes.inputField}
              variant="outlined"
              margin="dense"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (searchInput || isMobile) && (
                  <InputAdornment position="end">
                    <IconButton color="primary" size="small" onClick={clearSearch}>
                      <HighlightOffIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </div>
      )}
      <IconButton onClick={toggleBars} style={{ marginRight: 20 }}>
        <LocalOfferIcon color={tagActive ? "primary" : "inherit"} />
      </IconButton>
    </div>
  );
};

export default SearchBar;
