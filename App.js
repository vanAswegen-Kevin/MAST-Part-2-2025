import * as React from "react";
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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Christoffel’s Dishes" }} />
          <Stack.Screen name="AddDish" component={AddDishScreen} options={{ title: "Add Menu Item" }} />
          <Stack.Screen name="Filter" component={FilterScreen} options={{ title: "Filter Menu" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DishProvider>
  );
}
