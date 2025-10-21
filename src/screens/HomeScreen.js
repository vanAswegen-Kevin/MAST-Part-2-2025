// src/screens/HomeScreen.js
import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDishes } from "../context/DishContext";
import MenuItemCard from "../components/MenuItemCard";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { dishes, clearDishes } = useDishes();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel’s Dishes</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Total Dishes: {dishes.length}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("AddDish")}>
          <Text style={styles.addBtnText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={() => navigation.navigate("Filter")}>
          <Text style={styles.filterBtnText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No dishes yet. Add your first dish.</Text>}
      />

      {dishes.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={() => clearDishes()}>
          <Text style={{ color: "#fff" }}>Clear All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  infoText: { fontSize: 16, marginRight: 12 },
  addBtn: { backgroundColor: "#264653", padding: 8, borderRadius: 6, marginRight: 8 },
  addBtnText: { color: "#fff" },
  filterBtn: { borderColor: "#264653", borderWidth: 1, padding: 8, borderRadius: 6 },
  filterBtnText: { color: "#264653" },
  empty: { textAlign: "center", marginTop: 20, color: "#666" },
  clearBtn: { marginTop: 12, backgroundColor: "#e63946", padding: 12, borderRadius: 8, alignItems: "center" },
});
