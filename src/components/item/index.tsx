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
  imageContainer: {
    // display: "flex", // 이미지 컨테이너로 flex 사용
    // justifyContent: "center", // 가운데 정렬
    // alignItems: "center", // 가운데 정렬
    // width: 100, // 100% 너비
    // height: 50, // 적절한 높이 설정
    // backgroundColor: "blue", // 배경색을 설정하여 이미지 크기 확인
  },
  image: {
    // width: "100%", // 100% 너비로 꽉 차게
    marginLeft: 20,
    height: 40, // 100% 높이로 꽉 차게
    // objectFit: "cover", // 비율을 유지하면서 꽉 차게
  },
});

interface ItemProps {
  item: PromiseResultItemArray;
}

// 주로 html2canvas가 DOM 요소를 복제하고 그 요소가 포함된 iframe을 캡처하려 할 때 발생할 수있어서 안된다. 사용못함
function Item({ item }: ItemProps) {
  // console.log("item 컴퍼넌트입니다", item);
  // https://dev.to/logrocket/generating-pdfs-in-react-with-react-pdf-3na0
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
