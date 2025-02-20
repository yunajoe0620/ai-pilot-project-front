import { StyleSheet, Text, View } from "@react-pdf/renderer";

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

function Item({ item }: ItemProps) {
  console.log("item", item);
  return (
    <View style={styles.section}>
      <Text style={styles.question}>{item}</Text>
    </View>
  );
}

export default Item;
