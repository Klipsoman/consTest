import { useSelector } from "react-redux";
import AppItem from "./AppItem";
import Filter from "./Filter";
import Input from "./Input";
import List from "./List";

export default function App() {
  let numbers = useSelector((state) => state.main.numbers);
  let words = useSelector((state) => state.main.words);
  let numAndWords = useSelector((state) => state.main.numAndWords);
  return (
    <div className="app">
      <AppItem className="app__item-white>">
        <Input />
      </AppItem>
      <AppItem className="app__item-peach">
        <List array={words} />
      </AppItem>
      <AppItem className="app__item-violet">
        <List array={numbers} />
      </AppItem>
      <AppItem className="app__item-black>">
        <List array={numAndWords} />
      </AppItem>
      <Filter />
    </div>
  );
}
