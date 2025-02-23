import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { memo } from "react";
import { PromiseResultItemArray } from "../../schemas/problem";
import {
  problemTypeObject,
  subjectObject,
  targetObject,
} from "../../utils/section-two";
import Item from "../item";

// TODO: cdn으로 다른 폰트 찾아보기!
Font.register({
  family: "SpoqaHanSans",
  src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf",
});

interface PDFDocumentProps {
  pdfProblems: [] | PromiseResultItemArray[];
  pdfAnswers: string;
  target: string;
  subject: string;
  problemType: string;
}

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    height: "100vh",
  },
  title: {
    fontFamily: "SpoqaHanSans",
    fontSize: 30,
    paddingLeft: 10,
  },
  subTitle: {
    fontFamily: "SpoqaHanSans",
    fontSize: 16,
  },
  section: {
    color: "black",
    padding: 10,
  },

  answer: {
    fontFamily: "SpoqaHanSans",
    fontSize: 10,
  },
});

const PDFDocument = memo(function PDFDocument({
  pdfProblems,
  pdfAnswers,
  target,
  subject,
  problemType,
}: PDFDocumentProps) {
  return (
    <Document title="fine-teacher-problems-pdf">
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subTitle}>
            {targetObject[target]} {subjectObject[subject]} 영역{" "}
            {problemTypeObject[problemType]} 유형 문제
          </Text>
        </View>
        <View>
          {pdfProblems.map((item, index) => (
            <Item item={item} key={index} />
          ))}
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>답안지</Text>
          <Text>{pdfAnswers}</Text>
        </View>
      </Page>
    </Document>
  );
});

export default PDFDocument;
