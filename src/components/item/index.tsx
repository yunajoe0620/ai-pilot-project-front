import { StyleSheet, Text, View } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import "katex/dist/katex.min.css";
import { useEffect, useState } from "react";

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
  const [latexImage, setLatexImage] = useState<string>("");

  // const splitItems = item.split("-------choices-------");
  // const aa = splitItems[0];
  // const bb = splitItems[1];
  // console.log("aa", aa, "bb", bb);

  useEffect(() => {
    // KaTeX 수식 생성
    const latexString = `\\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}`;
    const div = document.createElement("div");
    div.innerHTML = `<span style="font-size: 20px">${latexString}</span>`;

    console.log("div", div);

    const convertStringToImage = async () => {
      const canvas = await html2canvas(div);

      console.log("canvas", canvas);
    };

    convertStringToImage();
    // HTML2Canvas를 사용해 div를 이미지로 변환

    // const renderToImage = () =>
    //   html2canvas(div, { useCORS: true }).then((canvas) => {
    //     const imgData = canvas.toDataURL("image/png");
    //     console.log("imgData --------------<<<<<<<<<<<<", imgData);
    //     setLatexImage(imgData);
    //   });

    // try {
    //   renderToImage();
    // } catch (err) {
    //   console.log("error", err);
    // }
  }, [item]);

  console.log("latextImage", latexImage);

  return (
    <View style={styles.section}>
      {/* <Text style={styles.question}>{item}</Text> */}
      <Text style={styles.question}>하이이이</Text>
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
