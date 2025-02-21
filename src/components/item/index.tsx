import { Canvas, Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import * as htmlToImage from "html-to-image";
import "katex/dist/katex.min.css";
import { useEffect, useState } from "react";
import { useIframeStore } from "../../store";

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

// 이슈

// **
// 주로 html2canvas가 DOM 요소를 복제하고 그 요소가 포함된 iframe을 캡처하려 할 때 발생할 수 있습니다.
// 이 에러는 특히 KaTeX와 같이 외부 라이브러리에서 렌더링된 콘텐츠를 캡처하려 할 때 발생하는 경우가 많습니다.

function Item({ item }: ItemProps) {
  // console.log("item,", item);
  const isIframeLoad = useIframeStore((state) => state.isIframeLoad);

  const handleIframeLoad = useIframeStore((state) => state.handleIframeLoad);

  const [latexImage, setLatexImage] = useState<HTMLCanvasElement | string>("");
  const [imageUrl, setImageUrl] = useState("");

  // const splitItems = item.split("-------choices-------");
  // const aa = splitItems[0];
  // const bb = splitItems[1];
  // console.log("aa", aa, "bb", bb);

  // html2canvas는 기본적으로 iframe의 콘텐츠를 캡처할 수 없거나 제한적인 경우가 많습니다. CORS 설정을 통해 문제를 해결할 수 있지만, 외부 도메인에서 로드된 콘텐츠는 클라이언트 측에서 캡처가 불가능할 수 있습니다.
  useEffect(() => {
    const convertStringToImage = async () => {
      const latexString = `\\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}`;
      const div = document.createElement("div");

      div.innerHTML = `<span style="width: 300px; height: 200px;">테스트입니다</span>`;
      document.body.appendChild(div);

      try {
        const canvas = await htmlToImage.toCanvas(div);
        const dataUrl = canvas.toDataURL();
        setImageUrl(dataUrl);
        setLatexImage(canvas);
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

  // https://dev.to/logrocket/generating-pdfs-in-react-with-react-pdf-3na0
  return (
    <View style={styles.section}>
      <Text style={styles.question}>{item}</Text>
      {imageUrl && (
        <Image style={{ width: "1200px", height: "40px" }} src={imageUrl} />
      )}

      <Canvas
        paint={(painter, availableWidth, availableHeight) => {
          painter
            .save()
            .moveTo(100, 100) //move to position 100,100
            .lineTo(300, 100) //draw a line till 300, 100
            .lineTo(300, 300) //draw another line till 300,300
            .fill("blue"); //when the diagram is drawn, set the background color to pink

          return null;
        }}
      />

      {/* <Text>
        <InlineMath
          math={"1번. \\begin{bmatrix} 1 & 4 & 2 & 5 & 3 & 6 \\end{bmatrix}"}
        />
      </Text> */}
      {/* 인라인 수식 */}
      {/* <Text>
        <InlineMath math="1번. \\begin{bmatrix} 1 & 4 & 2 & 5 & 3 & 6 \\end{bmatrix}" />
      </Text> */}

      {/* 블록 수식 예시 */}
      {/* <Text>
        <BlockMath math="A = \\begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \\end{bmatrix}" />
      </Text> */}

      {/* react-latex를 사용하여 인라인 수식 처리 */}
      {/* <Text>
        <Latex>{`1번. \\begin{bmatrix} 1 & 4 & 2 & 5 & 3 & 6 \\end{bmatrix}`}</Latex>
      </Text> */}
    </View>
  );
}

export default Item;
