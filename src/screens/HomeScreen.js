import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { DishContext } from "../context/DishContext";

export default function HomeScreen({ navigation }) {
  const { dishes } = useContext(DishContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Christoffel’s Dynamic Menu</Text>
      <Text style={styles.subheader}>Total Dishes: {dishes.length}</Text>

      <Button title="Add a Dish" onPress={() => navigation.navigate("Add Dish")} />
      <Button title="Filter by Course" onPress={() => navigation.navigate("Filter")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    marginBottom: 20,
  },
});
