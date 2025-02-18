import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { ReactNode } from "react";

interface PDFWrapper {
  children: ReactNode;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
function PDFWrapper({ children }: PDFWrapper) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {children}
      </Page>
    </Document>
  );
}

export default PDFWrapper;
