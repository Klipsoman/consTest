import React from "react";
import shield from "../assets/icons/shield.png";

export default function List({ array = [] }) {
  array = array.map((el, i) => {
    return (
      <li className="list__item" key={el.value + i}>
        <div className="list__into">     
        {el.value}{" "}
        {el.country && <> <img className="list__icon" src={shield} alt="" /><span>{el.country}</span> </> }
        {el.capital && <> <img className="list__icon" src={shield} alt="" /><span>{el.capital}</span> </>}
        {el.counter ? (
          <span className="count-span">
            {el.counter !== 1 && "x " + el.counter}
          </span>
        ) : null}
        </div>
      </li>
    );
  });
  return <ul className="list">{array}</ul>;
}
