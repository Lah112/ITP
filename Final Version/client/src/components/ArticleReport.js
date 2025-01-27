import React, { useState, useEffect } from "react";
import { useArticleReportStyles } from "../styles/muiStyles";
import articleService from "../services/article";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import dayjs from "dayjs";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ArticleReportPDF from "./ArticleReportPDF";

const ArticleReport = () => {
  const classes = useArticleReportStyles();
  const [fetchedData, setFetchedData] = useState([]);

  const fetchData = async () => {
    console.log("Fetching article report data...");
    const response = await articleService.getAllArticles();
    console.log(response);
    setFetchedData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <div className={classes.titleContainer}>
          <h1>Article Report</h1>
          <PDFDownloadLink
            document={<ArticleReportPDF data={fetchedData} />}
            fileName={`article-report-${dayjs().format("YYYY-MM-DD h.mm.ss a")}.pdf`}
            style={{
              textDecoration: "none",
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : (
                <p className={classes.download}>Download Article Report</p>
              )
            }
          </PDFDownloadLink>
        </div>
        <div className={classes.detailsContainer}>
          <TableContainer
            style={{
              maxHeight: 440,
              maxWidth: "70%",
            }}
          >
            <Table className={classes.tableStyle} stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Idx</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Created Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchedData &&
                  fetchedData.map((article, index) => (
                    <TableRow
                      key={article.id}
                      style={{
                        alignItems: "baseline",
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {article.author ? article.author.username : "Unknown"}
                      </TableCell>
                      <TableCell>
                        {article.title ? article.title : "Unknown"}
                      </TableCell>
                      <TableCell>{article.category}</TableCell>
                      <TableCell>
                        {dayjs(article.createdAt).format("DD-MM-YYYY")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ArticleReport;