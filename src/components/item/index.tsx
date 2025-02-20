import { StyleSheet, Text, View } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  section: {
    backgroundColor: "#b8a0a0",
    color: "black",
    padding: 10,
  },

  question: {
    fontFamily: "SpoqaHanSans",
    fontSize: 30,
  },
});
interface ItemProps {
  item: string;
}

function Item({ item }: ItemProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.question}>{item}</Text>
    </View>
  );
}

export default Item;
