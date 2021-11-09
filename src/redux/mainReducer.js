const ADD_NUMBER = "ADD_NUMBER";
const ADD_WORD = "ADD_WORD";
const ADD_NUMB_AND_WORD = "ADD_NUMB_AND_WORD";
const ADD_CAPITAL = "ADD_CAPITAL";
const ADD_COUNTRY = "ADD_COUNTRY";
const SORT = "SORT";

const initialState = {
  value: "",
  numbers: [],
  words: [],
  numAndWords: [],
  isFilterActive: false,
};

export function mainReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NUMBER:
      return {
        ...state,
        value: "",
        numbers: [
          ...state.numbers,
          {
            dateOfCreate: Date.now(),
            value: action.payload,
          },
        ],
      };
    case ADD_WORD:
      return {
        ...state,
        value: "",
        words: state.words.some((el) => el.value === action.payload)
          ? state.words.map((el) => {
              if (el.value === action.payload) {
                return {
                  ...el,
                  counter: el.counter + 1,
                  capital: "",
                  country: "",
                };
              } else {
                return el;
              }
            })
          : [
              ...state.words,
              {
                dateOfCreate: Date.now(),
                value: action.payload,
                counter: 1,
                capital: "",
                country: "",
              },
            ],
      };
    case ADD_NUMB_AND_WORD:
      return {
        ...state,
        value: "",
        numAndWords: [
          ...state.numAndWords,
          {
            dateOfCreate: Date.now(),
            value: action.payload,
          },
        ],
      };
    case ADD_CAPITAL:
      return {
        ...state,
        value: "",
        words: state.words.map((el) => {
          if (el.value === action.word) {
            return {
              ...el,
              capital: action.capital,
            };
          } else {
            return el;
          }
        }),
      };
    case ADD_COUNTRY:
      return {
        ...state,
        value: "",
        words: state.words.map((el) => {
          if (el.value === action.word) {
            return {
              ...el,
              country: action.country,
            };
          } else {
            return el;
          }
        }),
      };
    case SORT:
      if (action.payload === true) {
        let collator = new Intl.Collator();
        return {
          ...state,
          numbers: [...state.numbers.sort((a, b) => a.value - b.value)],
          words: [
            ...state.words.sort((a, b) => collator.compare(a.value, b.value)),
          ],
          numAndWords: [
            ...state.numAndWords.sort((a, b) =>
              collator.compare(a.value, b.value)
            ),
          ],
          isFilterActive: action.payload,
        };
      }
      if (action.payload === false) {
        return {
          ...state,
          numbers: [
            ...state.numbers.sort((a, b) => a.dateOfCreate - b.dateOfCreate),
          ],
          words: [
            ...state.words.sort((a, b) => a.dateOfCreate - b.dateOfCreate),
          ],
          numAndWords: [
            ...state.numAndWords.sort(
              (a, b) => a.dateOfCreate - b.dateOfCreate
            ),
          ],
          isFilterActive: action.payload,
        };
      }
    default:
      return state;
  }
}

export const putNumber = (payload) => ({ type: ADD_NUMBER, payload });
export const putWord = (payload) => ({ type: ADD_WORD, payload });
export const putNumbAndWord = (payload) => ({
  type: ADD_NUMB_AND_WORD,
  payload,
});
export const sort = (payload) => ({ type: SORT, payload });
export const putCountry = (country, word) => ({
  type: ADD_COUNTRY,
  country,
  word,
});
export const putCapital = (capital, word) => ({
  type: ADD_CAPITAL,
  capital,
  word,
});

export const getCapitalOrCountry = (word) => async (dispatch) => {
  try {
    if (word.length < 4) return;
    let resCountry = await fetch(`https://restcountries.com/v2/name/${word}`);
    let resCapital = await fetch(
      `https://restcountries.com/v2/capital/${word}`
    );
    let isCountry = await resCountry.json();
    let isCapital = await resCapital.json();
    if (Array.isArray(isCountry)) {
      let country = isCountry[0].capital;
      dispatch(putCountry(country, word));
      return;
    }
    if (Array.isArray(isCapital)) {
      let capital = isCapital[0].name;
      dispatch(putCapital(capital, word));
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
