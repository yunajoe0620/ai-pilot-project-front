import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { memo, useEffect, useState } from "react";
import {
  problemSplit,
  seperateQuestionAndAnswerArray,
} from "../../utils/section-two";
import Item from "../item";

// TODO: cdn으로 다른 폰트 찾아보기!
Font.register({
  family: "SpoqaHanSans",
  src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf",
});
interface PDFDocumentProps {
  problems: {
    response: string;
  };
  target: string;
  subject: string;
  problemType: string;
}

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  title: {
    fontFamily: "SpoqaHanSans",
    fontSize: 30,
    paddingLeft: 10,
  },
  section: {
    backgroundColor: "#b8a0a0",
    color: "black",
    padding: 10,
  },
});

const PDFDocument = memo(function PDFDocument({
  problems,
  target,
  subject,
  problemType,
}: PDFDocumentProps) {
  const [problemArr, setProblemArr] = useState([]);
  const result = problemSplit(problems);

  useEffect(() => {
    if (result) {
      setProblemArr(result);
    }
  }, [problems]);

  console.log("problemsArr입니다앙아", problemArr);

  const { onlyProblemsArr, onlyAnswersArr } =
    seperateQuestionAndAnswerArray(problemArr);

  //
  const sampleArr = [
    "1. 12 ÷ 4 = ?  \na) 2  \nb) 3  \nc) 4  \nd) 6  \n",
    "  \n2. 15 ÷ 3 = ?  \na) 4  \nb) 5  \nc) 6  \nd) 7  \n",
    "  \n3. 20 ÷ 5 = ?  \na) 2  \nb) 3  \nc) 4  \nd) 5  \n",
    "  \n4. 18 ÷ 6 = ?  \na) 2  \nb) 3  \nc) 4  \nd) 5  \n",
    "  \n5. 25 ÷ 5 = ?  \na) 3  \nb) 4  \nc) 5  \nd) 6  \n",
    "  \n6. 30 ÷ 6 = ?  \na) 4  \nb) 5  \nc) 6  \nd) 7  \n",
    "  \n7. 16 ÷ 4 = ?  \na) 2  \nb) 3  \nc) 4  \nd) 5  \n",
    "  \n8. 24 ÷ 8 = ?  \na) 2  \nb) 3  \nc) 4  \nd) 5  \n",
    "  \n9. 40 ÷ 10 = ?  \na) 3  \nb) 4  \nc) 5  \nd) 6  \n",
    "  \n10. 45 ÷ 9 = ?  \na) 4  \nb) 5  \nc) 6  \nd) 7  \n",
    "  \n\n답: 1-b, 2-b, 3-c, 4-b, 5-c, 6-b, 7-c, 8-c, 9-c, 10-b",
  ];

  // document, page, view, Image, Text, Link, Note, canvas
  return (
    <Document title="fine-teacher-problems-pdf">
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>중학교 수학영역 객관식유형 문제</Text>
          {/* <Text style={styles.title}>{target} {subject} 영역 {subject}유형 문제</Text> */}
        </View>
        <View>
          {sampleArr.map((item) => (
            <Item item={item} />
          ))}
        </View>
      </Page>
    </Document>
  );
});

export default PDFDocument;
