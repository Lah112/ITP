import React, { useState, useEffect } from "react";
import { useArticleStyles } from "../styles/muiStyles";
import ArticleCard from "./ArticleCard";
import ArticleFormModal from "./ArticleFormModal";
import articleService from "../services/article";
import {
  Checkbox,
  Divider,
  FormLabel,
  Input,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import { Search } from "@material-ui/icons";
import { Close } from "@material-ui/icons";
import LoadingSpinner from "./LoadingSpinner";

const ArticlePage = () => {
  const classes = useArticleStyles();

  const [fetchedData, setFetchedData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isOwnArticle, setIsOwnArticle] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const userString = localStorage.getItem("readifyUserKey");
  const user = userString ? JSON.parse(userString) : null;

  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    const response = await articleService.getAllArticles();
    setFetchedData(response);
    setFilteredData(response);
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const lowerCaseSearch = search.trim().toLowerCase();

    const filtered = fetchedData.filter((article) => {
      const matchesTitle = article.title
        .toLowerCase()
        .includes(lowerCaseSearch);

      const matchesAuthor = article.author && article.author.username
        ? article.author.username.toLowerCase().includes(lowerCaseSearch)
        : false; // Handle case where author is null

      const matchesCategory = article.category
        .toLowerCase()
        .includes(lowerCaseSearch);

      // Check if any tag in the array matches the search term
      const matchesTag = article.tags.some((tag) =>
        tag.toLowerCase().includes(lowerCaseSearch)
      );

      const matchesOwnArticle =
        isOwnArticle && user ? article.author && article.author.id === user.id : true;

      return (
        (matchesTitle || matchesAuthor || matchesCategory || matchesTag) &&
        matchesOwnArticle
      );
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [search, fetchedData, isOwnArticle]);


  return (
    <div
      style={{
        maxWidth: "1920px",
        display: "flex",
        justifyContent: "center",
        height: "80vh",
        maxHeight: "90vh",
        width: "100%",
      }}
    >
      <div className={classes.container}>
        <h1>Articles</h1>

        {!isLoaded ? (
          <LoadingSpinner text={"Fetching articles. Wait a sec."} />
        ) : (
          <>
            <div className={classes.searchBarContainer}>
              {user && user.id && (
                <>
                  <FormLabel htmlFor="own">Own Article</FormLabel>
                  <Checkbox
                    id="own"
                    checked={isOwnArticle}
                    onChange={(e) => {
                      setIsOwnArticle(e.target.checked);
                      setSearch("");
                    }}
                  />

                  <Divider
                    orientation="vertical"
                    flexItem
                    style={{
                      width: 2,
                      backgroundColor: "black",
                      margin: "0 10px",
                    }}
                  />
                </>
              )}
              <Input
                className={classes.searchBar}
                placeholder="Search by Title, Author, Category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                endAdornment={
                  <div style={{ display: "flex", gap: 5 }}>
                    {search && (
                      <Close
                        style={{ cursor: "pointer" }}
                        onClick={() => setSearch("")}
                      />
                    )}
                    <Search
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={handleSearch}
                    />
                  </div>
                }
              />
            </div>

            <div className={classes.articleContainer}>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <ArticleCard
                    key={item.id}
                    data={item}
                    userId={user ? user.id : null}
                    setSearch={setSearch}
                  />
                ))
              ) : (
                <div>
                  <p
                    style={{
                      textAlign: "center",
                      color: "gray",
                      fontSize: "1.2rem",
                    }}
                  >
                    No articles found
                  </p>
                </div>
              )}
              {isMobile && (
                <div
                  style={{
                    height: 50,
                    width: "100%",
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>

      <div>
        <button
          className={classes.addArticleBtn}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
          onClick={() => setOpen(true)}
        >
          {isMobile ? <Add /> : "Add Article"}
        </button>
      </div>

      <ArticleFormModal
        open={open}
        setOpen={setOpen}
        fetchData={fetchData}
        actionType="add"
      />
    </div>
  );
};

export default ArticlePage;
