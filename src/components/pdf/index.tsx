import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

interface PDFDocumentProps {
  problems?: string;
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

function PDFDocument({ problems }: PDFDocumentProps) {
  console.log("pdfCoument훅입니다앙아", problems);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
      </Page>
    </Document>
  );
}

export default PDFDocument;
