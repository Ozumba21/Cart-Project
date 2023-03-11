import React from "react";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import style from "./AvailableMeal.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [Iserror, setError] = useState();
  useEffect(() => {
    const FetchMeals = async () => {
      const response = await fetch(
        "https://victor-34532-default-rtdb.firebaseio.com/Meals.json"
      );

      if (!response.ok) {
        throw new Error("something went Wrong");
      }
      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          Name: responseData[key].Name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    FetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);
  if (isloading) {
    return (
      <section className={style.mealloading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (Iserror) {
    return (
      <section className={style.Error}>
        <p>{Iserror}</p>
      </section>
    );
  }
  const MealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.Name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={style.meals}>
      <Card>
        <ul>{MealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
