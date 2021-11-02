const ADD_NUMBER = "ADD_NUMBER";
const ADD_WORD = "ADD_WORD";
const ADD_NUMB_AND_WORD = "ADD_NUMB_AND_WORD";
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
          {
            dateOfCreate: Date.now(),
            value: action.payload,
          },
          ...state.numbers,
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
                };
              } else {
                return el;
              }
            })
          : [
              {
                dateOfCreate: Date.now(),
                value: action.payload,
                counter: 1,
              },
              ...state.words,
            ],
      };
    case ADD_NUMB_AND_WORD:
      return {
        ...state,
        value: "",
        numAndWords: [
          {
            dateOfCreate: Date.now(),
            value: action.payload,
          },
          ...state.numAndWords,
        ],
      };
    case SORT:
      if (action.payload === true) {
        return {
          ...state,
          numbers: [...state.numbers.sort((a, b) => a.value - b.value)],
          words: [
            ...state.words.sort(
              (a, b) =>
                (a.value < b.value && -1) || (a.value > b.value && 1) || 0
            ),
          ],
          numAndWords: [
            ...state.numAndWords.sort(
              (a, b) =>
                (a.value < b.value && -1) || (a.value > b.value && 1) || 0
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
