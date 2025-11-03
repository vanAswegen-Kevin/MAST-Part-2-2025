// src/context/DishContext.js
import React, { createContext, useState } from "react";

export const DishContext = createContext();

export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);

  // addDish: adds a new dish object { id, name, description, course, price }
  const addDish = (dish) => {
    setDishes((prevDishes) => [...prevDishes, dish]);
  };

  // removeDish: removes a dish by id
  const removeDish = (id) => {
    setDishes((prevDishes) => prevDishes.filter((d) => d.id !== id));
  };

  // filterDishesByCourse: returns an array of dishes for the given course
  const filterDishesByCourse = (course) => {
    return dishes.filter((dish) => dish.course === course);
  };

  // optional helper to get averages (if you use it elsewhere)
  const getAveragePricePerCourse = () => {
    const courses = {};
    dishes.forEach((d) => {
      const c = d.course || "Unknown";
      if (!courses[c]) courses[c] = { total: 0, count: 0 };
      courses[c].total += Number(d.price) || 0;
      courses[c].count += 1;
    });
    const result = {};
    Object.keys(courses).forEach((k) => {
      result[k] = courses[k].count ? +(courses[k].total / courses[k].count).toFixed(2) : 0;
    });
    // ensure the common courses exist
    ["Starter", "Main", "Dessert"].forEach((c) => {
      if (!(c in result)) result[c] = 0;
    });
    return result;
  };

  return (
    <DishContext.Provider
      value={{
        dishes,
        addDish,
        removeDish, // <- exported so other screens can call it
        filterDishesByCourse,
        getAveragePricePerCourse,
      }}
    >
      {children}
    </DishContext.Provider>
  );
};
