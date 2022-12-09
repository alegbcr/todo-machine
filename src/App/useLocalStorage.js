import { useEffect, useReducer } from "react";

const useLocalStorage = (itemName, initialValue) => {
  // UseReducer for states
  const [state, dispatch] = useReducer(reducer, initialState({ initialValue }));
  // States
  const { sincronizedItem, loading, error, item } = state;

  //  ACTION CREATORS
  const onSuccess = (item) =>
    dispatch({ type: actionTypes.success, payload: item });
  const onError = (error) =>
    dispatch({ type: actionTypes.error, payload: error });
  const onSave = (item) => dispatch({ type: actionTypes.save, payload: item });
  const onSincronize = () => dispatch({ type: actionTypes.sincronize });

  useEffect(() => {
    setTimeout(() => {
      try {
        // set localStorage
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        // Updating the state
        onSuccess(parsedItem);
      } catch (error) {
        onError(error);
      }
    }, 2000);
  }, [sincronizedItem]);

  // Save ToDos in localStorage
  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSave(newItem);
    } catch (error) {
      onError(error);
    }
  };

  // Sicronize all ToDos
  const sincronizeItem = () => {
    onSincronize();
  };

  return { item, saveItem, loading, error, sincronizeItem };
};

const initialState = ({ initialValue }) => ({
  sincronizedItem: true,
  loading: true,
  error: false,
  item: initialValue,
});

// Action Types
const actionTypes = {
  success: "SUCCESS",
  error: "ERROR",
  save: "SAVE",
  sincronize: "SINCRONIZE",
};

// Reducer Object
const reducerObject = (state, payload) => ({
  [actionTypes.success]: {
    ...state,
    error: false,
    loading: false,
    sincronizedItem: true,
    item: payload,
  },
  [actionTypes.error]: { ...state, error: true },
  [actionTypes.save]: { ...state, item: payload },
  [actionTypes.sincronize]: {
    ...state,
    sincronizedItem: false,
    loading: true,
  },
});

// Reducer
const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage };
