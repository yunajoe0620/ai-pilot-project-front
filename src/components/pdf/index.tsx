import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { memo, useEffect, useState } from "react";
import { useIframeStore } from "../../store";
import {
  problemSplit,
  problemTypeObject,
  seperateQuestionAndAnswerArray,
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
    backgroundColor: "#b8a0a0",
    color: "black",
    padding: 10,
  },

  answer: {
    fontFamily: "SpoqaHanSans",
    fontSize: 10,
  },
});

const PDFDocument = memo(function PDFDocument({
  problems,
  target,
  subject,
  problemType,
}: PDFDocumentProps) {
  const isIframeLoad = useIframeStore((state) => state.isIframeLoad);

  const [problemArr, setProblemArr] = useState([]);
  const [onlyProblemsArr, setOnlyProblemsArr] = useState([]);
  const [onlyAnswerArr, setOnlyAnswersArr] = useState("");
  const result = problemSplit(problems);

  useEffect(() => {
    if (result) {
      setProblemArr(result);
    }
  }, [problems]);

  useEffect(() => {
    const { onlyProblemsArray, onlyAnswersArray } =
      seperateQuestionAndAnswerArray(problemArr);
    setOnlyProblemsArr(onlyProblemsArray);
    setOnlyAnswersArr(onlyAnswersArray);
  }, [problemArr]);

  console.log(
    "문제만 뽑았습니다",
    onlyProblemsArr,
    "정답만 뽑았습니다",
    onlyAnswerArr
  );

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
          {onlyProblemsArr &&
            onlyProblemsArr.map((item, index) => (
              <Item item={item} key={index} />
            ))}
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>답안지</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.answer}>{onlyAnswerArr && onlyAnswerArr}</Text>
        </View>
      </Page>
    </Document>
  );
});

export default PDFDocument;
