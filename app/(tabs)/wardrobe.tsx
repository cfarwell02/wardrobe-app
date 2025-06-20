import { useWardrobe } from "@/context/WardrobeContext";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const itemSize = screenWidth / 2 - 24; // Two items per row with spacing

export default function WardrobeScreen() {
  const { items } = useWardrobe();

  const renderItem = ({
    item,
  }: {
    item: { image: string; category: string };
  }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.category}>{item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>No items yet. Add some clothes!</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    overflow: "hidden",
    width: itemSize,
    alignItems: "center",
  },
  image: {
    width: itemSize,
    height: itemSize,
    resizeMode: "cover",
  },
  category: {
    padding: 8,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
