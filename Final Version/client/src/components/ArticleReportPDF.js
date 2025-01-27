import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import logo from "../assets/logo.png"; // Make sure this path is correct

// Optional: Add custom fonts if needed
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/Roboto/2.136/Roboto-Regular.ttf",
});

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontFamily: "Roboto",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    maxWidth:150,
    maxHeight: 100,
    alignSelf: "center",
    marginBottom: 10, // Space between the logo and header
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1pt solid black",
  },
  tableCell: {
    padding: 8,
    flex: 1,
    fontSize: 12,
    textAlign: "center",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
});

const ArticleReportPDF = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
      <View style={styles.section}>
      <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <Image
            src={logo}
            style={{ width: "auto", height: 20, marginRight: "20px" }}
          />
          <Text style={styles.title}>Article Report</Text>
        </View>
        <Text
          style={{
            alignSelf: "flex-end",
            fontSize: 10,
          }}
        >
          {new Date().toLocaleDateString()}
        </Text>
      </View>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Idx</Text>
            <Text style={styles.tableCell}>Username</Text>
            <Text style={styles.tableCell}>Title</Text>
            <Text style={styles.tableCell}>Category</Text>
            <Text style={styles.tableCell}>Created Date</Text>
          </View>
          {data.map((article, index) => (
            <View key={article.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>
                {article.author ? article.author.username : "Unknown"}
              </Text>
              <Text style={styles.tableCell}>
                {article.title ? article.title : "Unknown"}
              </Text>
              <Text style={styles.tableCell}>{article.category}</Text>
              <Text style={styles.tableCell}>
                {new Date(article.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ArticleReportPDF;