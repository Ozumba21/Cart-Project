import React from "react";
import style from "./MealSummary.module.css"

const MealsSummary = () => {
  return (
    <section className= {style.summary}>
      <h2>Delicious food, Delivered To You</h2>
      <p>
        Choose your favourite meal from our broad selection of available meals
        and enjoy a Delicious lunch or dinner at home
      </p>
      <p>
        All our meals are cooked with high quality ingredient, just-in-time and
        of course by experienced chefs;
      </p>
    </section>
  );
};
export default MealsSummary;
