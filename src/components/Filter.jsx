import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sort } from "../redux/mainReducer";

export default function Filter() {
  let [active, setActive] = useState(false);
  let dispatch = useDispatch();
  function handleClick() {
    if (!active) {
      dispatch(sort(true));
    } else {
      dispatch(sort(false));
    }
    setActive(!active);
  }
  return (
    <div className="filter">
      <div
        className={active ? "switch-btn switch-on" : "switch-btn"}
        onClick={handleClick}
      ></div>
    </div>
  );
}
