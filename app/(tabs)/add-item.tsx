import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";

export default function WardrobeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>This is the Add Item Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    color: "#000",
  },
});
