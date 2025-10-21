// src/screens/FilterScreen.js
import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useDishes } from "../context/DishContext";
import MenuItemCard from "../components/MenuItemCard";

const courses = ["All", "Starter", "Main", "Dessert"];

export default function FilterScreen() {
  const { dishes } = useDishes();
  const [selected, setSelected] = useState("All");

  const filtered = useMemo(() => {
    if (selected === "All") return dishes;
    return dishes.filter((d) => d.course.toLowerCase() === selected.toLowerCase());
  }, [dishes, selected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu Items</Text>

      <View style={styles.row}>
        {courses.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setSelected(c)}
            style={[styles.filterButton, selected === c && styles.filterButtonActive]}>
            <Text style={[styles.filterText, selected === c && styles.filterTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No items found for {selected}.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  row: { flexDirection: "row", marginBottom: 12, justifyContent: "space-around" },
  filterButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: "#264653" },
  filterButtonActive: { backgroundColor: "#264653" },
  filterText: { color: "#264653" },
  filterTextActive: { color: "#fff" },
  empty: { textAlign: "center", marginTop: 16, color: "#666" },
});
