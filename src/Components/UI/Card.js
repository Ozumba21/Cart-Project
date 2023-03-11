import { Fragment } from "react";
import style from "./Card.module.css";

const Card = (props) => {
  return (
    <Fragment>
      <div className={style.Card}>{props.children}</div>
    </Fragment>
  );
};
export default Card;
