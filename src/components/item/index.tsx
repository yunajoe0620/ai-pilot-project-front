import { Text, View } from "@react-pdf/renderer";
import { styles } from "../pdf";

interface ItemProps {
  item: string;
}

function Item({ item }: ItemProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.section}>{item}</Text>
    </View>
  );
}

export default Item;
