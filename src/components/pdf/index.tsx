import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { memo, useEffect, useState } from "react";
import { problemSplit } from "../../utils/section-two";

interface PDFDocumentProps {
  problems: {
    response: string;
  };
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

const PDFDocument = memo(function PDFDocument({ problems }: PDFDocumentProps) {
  const [problemArr, setProblemArr] = useState([]);
  const result = problemSplit(problems);

  useEffect(() => {
    if (result) {
      setProblemArr(result);
    }
  }, [problems]);

  console.log("problemsArr입니다앙아", problemArr);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
      </Page>
    </Document>
  );
});

export default PDFDocument;
