// src/context/DishContext.js
import React, { createContext, useState, useContext } from "react";

/**
 * DishContext provides:
 * - dishes: array of dish objects
 * - addDish: function to add a dish
 * - deleteDish: optional helper to remove a dish
 */

const DishContext = createContext();

export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([
    // optional sample data to help during development
    // { id: "1", name: "Sample Starter", description: "Tasty", course: "Starter", price: 45 }
  ]);

  const addDish = (dish) => {
    // generate a simple unique id (timestamp + random)
    const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newDish = { id, ...dish };
    setDishes((prev) => [newDish, ...prev]);
  };

  const deleteDish = (id) => {
    setDishes((prev) => prev.filter((d) => d.id !== id));
  };

  const clearDishes = () => setDishes([]);

  return (
    <DishContext.Provider value={{ dishes, addDish, deleteDish, clearDishes }}>
      {children}
    </DishContext.Provider>
  );
};

// custom hook for easier consumption
export const useDishes = () => {
  const ctx = useContext(DishContext);
  if (!ctx) throw new Error("useDishes must be used inside a DishProvider");
  return ctx;
};
