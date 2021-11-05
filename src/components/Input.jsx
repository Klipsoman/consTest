import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getCapitalOrCountry, putNumbAndWord, putNumber, putWord } from "../redux/mainReducer";

export default function Input() {
  let [value, setValue] = useState("");
  let dispatch = useDispatch();
  let ref = useRef();
  // let regNumbers = new RegExp("^\\d+$");
  let regNumbers = new RegExp("^[0-9 ]*$");
  let regWords = new RegExp(/^[a-zа-яё ]+$/i);
  let regWordsAndNumb = new RegExp(/^([a-zа-яё]+|\d+)$/i);
  // let regWords = new RegExp("[a-zA-Zа-яА-Я ]*$");

  useEffect(() => {
    ref.current.focus();
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (value.length < 1 || value.trim().length < 1) return;
    if (e.key === "Enter") {
      if (regNumbers.test(value)) {
        dispatch(putNumber(value));
        setValue("");
        return;
      }
      if (regWords.test(value)) {
        dispatch(putWord(value));
        dispatch(getCapitalOrCountry(value))
        setValue("");
        return;
      }
      if(!regWordsAndNumb.test(value)){
      dispatch(putNumbAndWord(value));
      setValue("");
      return;
      }
    }
  }
  return (
    <div className="input-box">
      <input
        className="input"
        type="text"
        placeholder="Введите данные..."
        ref={ref}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
