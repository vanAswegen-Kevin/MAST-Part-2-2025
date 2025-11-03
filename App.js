import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DishProvider } from "./src/context/DishContext";
import HomeScreen from "./src/screens/HomeScreen";
import AddDishScreen from "./src/screens/AddDishScreen";
import FilterScreen from "./src/screens/FilterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DishProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add Dish" component={AddDishScreen} />
          <Stack.Screen name="Filter" component={FilterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DishProvider>
  );
}
