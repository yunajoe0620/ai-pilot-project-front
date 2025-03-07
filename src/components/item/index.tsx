import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import "katex/dist/katex.min.css";
import { PromiseResultItemArray } from "../../schemas/problem";

export const styles = StyleSheet.create({
  section: {
    color: "black",
    padding: 10,
  },

  question: {
    fontFamily: "SpoqaHanSans",
    fontSize: 20,
    marginLeft: 10,
  },
  imageContainer: {},
  image: {
    marginLeft: 20,
  },
});

interface ItemProps {
  item: PromiseResultItemArray;
}

// 주로 html2canvas가 DOM 요소를 복제하고 그 요소가 포함된 iframe을 캡처하려 할 때 발생할 수있어서 안된다. 사용못함
function Item({ item }: ItemProps) {
  // PDF 참고용 사이트 ===>> https://dev.to/logrocket/generating-pdfs-in-react-with-react-pdf-3na0
  return item.map((data, index) => {
    if (data.type === "text") {
      return (
        <View style={styles.section} key={index}>
          <Text style={styles.question}>{data.value}</Text>
        </View>
      );
    } else {
      return (
        <View key={index} style={styles.imageContainer}>
          <Image src={data.value} style={styles.image} />
        </View>
      );
    }
  });
}

export default Item;
