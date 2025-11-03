import React, { useContext, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import { DishContext } from "../context/DishContext";

export default function FilterScreen() {
  const { dishes, filterDishesByCourse, removeDish } = useContext(DishContext);
  const [filteredDishes, setFilteredDishes] = useState([]);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this dish?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            removeDish(id);
            setFilteredDishes((prev) => prev.filter((dish) => dish.id !== id));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter by Course</Text>

      {/* Filter buttons */}
      <View style={styles.buttonRow}>
        <Button title="Starters" onPress={() => setFilteredDishes(filterDishesByCourse("Starter"))} />
        <Button title="Mains" onPress={() => setFilteredDishes(filterDishesByCourse("Main"))} />
        <Button title="Desserts" onPress={() => setFilteredDishes(filterDishesByCourse("Dessert"))} />
      </View>

      {/* Show all */}
      <View style={{ marginVertical: 10 }}>
        <Button title="Show All Dishes" onPress={() => setFilteredDishes(dishes)} />
      </View>

      {/* List of dishes */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No dishes found.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>Course: {item.course}</Text>
              <Text>Price: R{item.price}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Remove"
                color="#d9534f"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  dishName: { fontSize: 18, fontWeight: "bold" },
  buttonContainer: { marginLeft: 10 },
  emptyText: { textAlign: "center", color: "#888", marginTop: 20 },
});
