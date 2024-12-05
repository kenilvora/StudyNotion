import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
  Font,
} from "@react-pdf/renderer";
import NotoSans from "../../fonts/static/NotoSans-Regular.ttf";

Font.register({
  family: "NotoSans",
  src: NotoSans,
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSans",
    fontSize: 12,
    padding: 20,
    color: "#333",
    backgroundColor: "#f4f6f8", // Light gray background for better contrast
  },
  container: {
    width: "100%",
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 8,
    backgroundColor: "#fff", // White container for a clean look
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  },
  header1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "2px solid #007BFF", // Underline for emphasis
  },
  logo: {
    width: 140,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF", // Primary blue for branding
  },
  section: {
    marginBottom: 20,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#007BFF",
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 20,
    borderBottom: "1px solid black",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#007BFF",
    color: "#fff",
    fontWeight: "bold",
  },
  tableCell: {
    padding: 8,
    fontSize: 14,
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "center",
  },
  bodyCell: {
    color: "#444",
  },
  courseNameCell: {
    flex: 2, // More width for the Course Name column
    textAlign: "center",
  },
  priceCell: {
    flex: 1, // Regular width for the Price column
    textAlign: "center",
  },
  total: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 15,
    color: "#007BFF",
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
    color: "#666",
  },
  link: {
    color: "#007BFF",
    textDecoration: "underline",
  },
  leftBox: {
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
  },
  rightBox: {
    borderTop: "1px solid black",
    borderRight: "1px solid black",
  },
});

const PDFFile = ({ logo, paymentDetails, date, receiptNo }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header1}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.title}>Payment Receipt</Text>
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Receipt No:</Text> {receiptNo}
          </Text>
          <Text>
            <Text style={styles.label}>Date:</Text> {date}
          </Text>
          <Text>
            <Text style={styles.label}>Customer Name:</Text>{" "}
            {paymentDetails.userName}
          </Text>
          <Text>
            <Text style={styles.label}>Email:</Text> {paymentDetails.email}
          </Text>
          <Text>
            <Text style={styles.label}>Contact No.:</Text>{" "}
            {paymentDetails.contactNumber}
          </Text>
          <Text>
            <Text style={styles.label}>Payment ID:</Text>{" "}
            {paymentDetails.paymentId}
          </Text>
        </View>

        {/* Courses Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Courses Purchased:</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text
                style={[
                  styles.tableCell,
                  styles.headerCell,
                  styles.courseNameCell,
                  styles.leftBox,
                ]}
              >
                Course Name
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.headerCell,
                  styles.priceCell,
                  styles.rightBox,
                ]}
              >
                Price
              </Text>
            </View>
            {/* Table Rows */}
            {paymentDetails.courses.map((course) => (
              <View style={styles.tableRow} key={course.courseId}>
                <Text
                  style={[
                    styles.tableCell,
                    styles.bodyCell,
                    styles.courseNameCell,
                    styles.leftBox,
                  ]}
                >
                  {course.courseName}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.bodyCell,
                    styles.priceCell,
                    styles.rightBox,
                  ]}
                >
                  ₹{course.coursePrice}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Total Amount */}
        <Text style={styles.total}>
          <Text style={styles.label}>Total Amount:</Text> ₹
          {paymentDetails.totalAmount}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your purchase!</Text>
          <Text>
            If you have any questions, contact us at{" "}
            <Link style={styles.link} src="mailto:studynotion111@gmail.com">
              inquiry@gmail.com
            </Link>
            .
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFFile;
