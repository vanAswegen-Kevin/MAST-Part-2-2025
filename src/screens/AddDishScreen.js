import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { DishContext } from "../context/DishContext";

export default function AddDishScreen({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  const { addDish } = useContext(DishContext);

  const handleAddDish = () => {
    if (!name || !course || !price) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newDish = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price: parseFloat(price),
    };

    addDish(newDish);
    Alert.alert("Success", "Dish successfully added!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Dish</Text>
      <TextInput placeholder="Dish Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Description" style={styles.input} value={description} onChangeText={setDescription} />
      <TextInput placeholder="Course (e.g., Starter, Main, Dessert)" style={styles.input} value={course} onChangeText={setCourse} />
      <TextInput placeholder="Price" style={styles.input} keyboardType="numeric" value={price} onChangeText={setPrice} />
      <Button title="Add Dish" onPress={handleAddDish} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});
