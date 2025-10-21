// src/screens/AddDishScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDishes } from "../context/DishContext";

export default function AddDishScreen() {
  const navigation = useNavigation();
  const { addDish } = useDishes();

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  const handleAddDish = () => {
    if (!dishName.trim() || !description.trim() || !course.trim() || !price.trim()) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }
    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert("Error", "Please enter a valid price greater than 0");
      return;
    }

    addDish({
      name: dishName.trim(),
      description: description.trim(),
      course: course.trim(),
      price: priceNum,
    });

    Alert.alert("Success", `${dishName} added successfully!`);
    // clear fields (nice UX) and go back
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <View>
        <Text style={styles.label}>Dish Name</Text>
        <TextInput style={styles.input} value={dishName} onChangeText={setDishName} placeholder="e.g. Wild Mushroom Risotto" />

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, { height: 80 }]} value={description} onChangeText={setDescription} multiline placeholder="Short description" />

        <Text style={styles.label}>Course (Starter / Main / Dessert)</Text>
        <TextInput style={styles.input} value={course} onChangeText={setCourse} placeholder="Starter" />

        <Text style={styles.label}>Price (R)</Text>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="85" />

        <View style={{ marginTop: 12 }}>
          <Button title="Save Dish" onPress={handleAddDish} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { marginTop: 10, fontWeight: "bold", fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
  },
});
