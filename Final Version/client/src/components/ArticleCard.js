import React from "react";
import { useHistory } from "react-router-dom";
import { useArticleStyles } from "../styles/muiStyles";
import dayjs from "dayjs";
import { ArrowRight } from "@material-ui/icons";

const ArticleCard = ({ data, userId, setSearch }) => {
  const classes = useArticleStyles(); 
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: `/article/${encodeURIComponent(data.title)}`,
      state: { articleData: data },
    });
  };

  return (
    <div className={classes.articleCard}>
      {data && data.author && data.author.id === userId && (
        <div className={classes.articleCardOwn}>Own</div>
      )}
      <div>
        <h2 className={classes.articleCardTitle}>{data.title}</h2>
        <p className={classes.articleCardContentText}>{data.content}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {data.tags.map((tag) => (
            <p
              key={tag}
              className={classes.articleTag}
              onClick={() => setSearch(tag)}
            >
              #{tag}
            </p>
          ))}
        </div>
      </div>

      <div className={classes.articleCardBtnContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {data.author ? (
            <p className={classes.articleCardAuthor}>
              By {data.author.username}
            </p>
          ) : (
            <p className={classes.articleCardAuthor}>Deleted User</p>
          )}
          <p className={classes.articleCardDate}>
            {dayjs(data.updatedAt).format("DD-MM-YYYY")}
          </p>
        </div>
        <button className={classes.articleCardBtn} onClick={handleClick}>
          Read More
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
