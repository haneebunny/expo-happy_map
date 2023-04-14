import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Map from "../src/components/Map";


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Expo + Next.js 👋
        <Pressable><Text>버튼버튼</Text></Pressable>
      </Text>
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "beige",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
