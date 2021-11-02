import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { putNumbAndWord, putNumber, putWord } from "../redux/mainReducer";

export default function Input() {
  let [value, setValue] = useState("");
  let dispatch = useDispatch();
  let ref = useRef();
  let regNumbers = new RegExp("^\\d+$");
  let regWords = new RegExp(/^[a-zа-яё]+$/i);

  useEffect(() => {
    ref.current.focus();
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (value.length < 1) return;
    if (e.key === "Enter") {
      if (regNumbers.test(value)) {
        dispatch(putNumber(value));
        setValue("");
        return;
      }
      if (regWords.test(value)) {
        dispatch(putWord(value));
        setValue("");
        return;
      }
      dispatch(putNumbAndWord(value));
      setValue("");
      return;
    }
  }
  return (
    <input
      className="input"
      type="text"
      placeholder="Введите данные..."
      ref={ref}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}
