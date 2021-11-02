import React from "react";

export default function List({ array = [] }) {
  array = array.map((el, i) => {
    return (
      <li key={el.value + i}>
        {el.value}{" "}
        {el.counter ? (
          <span className="count-span">(x {el.counter})</span>
        ) : null}
      </li>
    );
  });
  return <ul>{array}</ul>;
}
