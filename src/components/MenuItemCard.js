// src/components/MenuItemCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MenuItemCard({ item }) {
  if (!item) return null;
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.course}>{item.course} • R{item.price}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#eee", marginBottom: 10, backgroundColor: "#fff" },
  name: { fontWeight: "700", fontSize: 16 },
  course: { color: "#666", marginTop: 4 },
  desc: { marginTop: 6, color: "#333" },
});
