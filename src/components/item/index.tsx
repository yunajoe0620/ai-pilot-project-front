import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import * as htmlToImage from "html-to-image";
import KaTeX from "katex";
import "katex/dist/katex.min.css";
import { useEffect, useState } from "react";
import { useIframeStore } from "../../store";
import { splitItem } from "../../utils/section-two";
export const styles = StyleSheet.create({
  section: {
    color: "black",
    padding: 10,
  },

  question: {
    fontFamily: "SpoqaHanSans",
    fontSize: 20,
  },
});
interface ItemProps {
  item: string;
}

// 주로 html2canvas가 DOM 요소를 복제하고 그 요소가 포함된 iframe을 캡처하려 할 때 발생할 수있어서 안된다. => X
function Item({ item }: ItemProps) {
  // console.log("item,", item);
  const [imageUrl, setImageUrl] = useState("");
  const [itemQuestion, setItemQuestion] = useState("");
  const [itemChoices, setItemChoices] = useState("");

  // const { question, choices } = splitItem(item);
  const isIframeLoad = useIframeStore((state) => state.isIframeLoad);

  // html2canvas는 기본적으로 iframe의 콘텐츠를 캡처할 수 없거나 제한적인 경우가 많습니다. CORS 설정을 통해 문제를 해결할 수 있지만, 외부 도메인에서 로드된 콘텐츠는 클라이언트 측에서 캡처가 불가능할 수 있습니다.

  // https://github.com/talyssonoc/react-katex/blob/master/packages/react-katex/src/index.jsx
  const latexString = `\\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}`;
  const sample1 = `\(\begin{pmatrix} 3 & 1 \\ 2 & 4 \end{pmatrix}\)`;
  // 아래처럼 만들어야한다...
  // 중 백슬래시(\\)는 LaTeX에서 특수한 명령어를 시작하는 구문
  //  \\begin{pmatrix}는 "행렬을 시작한다"는 명령어
  // \\ : 이중 백슬래시는 LaTeX에서 행을 구분하는 역할
  // \\end{pmatrix} 는 특수한 명령어를 끝내는 구문
  const sample2 = `\\begin{pmatrix} 3 & 1 \\ 2 & 4 \\end{pmatrix}`;
  // const result = transformLatexString(sample1);
  // console.log("result ===>>>>>>", result);

  console.log("itemQuestion ====>>>>>>>>>>", itemQuestion);

  useEffect(() => {
    const convertStringToImage = async () => {
      const div = document.createElement("div");

      div.innerHTML = `<span id="latex-container" style="width: 300px; height: 200px;">${KaTeX.renderToString(
        sample2
      )}</span>`;
      document.body.appendChild(div);

      try {
        const canvas = await htmlToImage.toCanvas(div);
        const dataUrl = canvas.toDataURL();
        setImageUrl(dataUrl);
      } catch (error) {
        console.error("Error converting HTML to image:", error);
      }
    };

    // call하기
    if (!isIframeLoad) {
      try {
        convertStringToImage();
      } catch (err) {
        console.log("error", err);
      }
    }
  }, [item, isIframeLoad]);

  useEffect(() => {
    const { question, choices } = splitItem(item);
    console.log("question ====>>>", question);
    setItemQuestion(question);
    setItemChoices(choices);
  }, [item]);

  // console.log("itemQUestion", itemQuestion);
  // https://dev.to/logrocket/generating-pdfs-in-react-with-react-pdf-3na0
  return (
    <View style={styles.section}>
      <Text style={styles.question}>{item}</Text>
      {imageUrl && (
        <Image style={{ width: "1200px", height: "24px" }} src={imageUrl} />
      )}

      {/* <Canvas
        paint={(painter, availableWidth, availableHeight) => {
          painter
            .save()
            .moveTo(100, 100) //move to position 100,100
            .lineTo(300, 100) //draw a line till 300, 100
            .lineTo(300, 300) //draw another line till 300,300
            .fill("blue"); //when the diagram is drawn, set the background color to pink

          return null;
        }}
      /> */}
    </View>
  );
}

export default Item;
