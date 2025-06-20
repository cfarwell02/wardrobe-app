import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to my Wardrobe App</Text>
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
