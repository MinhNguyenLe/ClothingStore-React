import Types from './Types';

const defaultState = {
  name: '',
  height: 0,
  weight: 0,
  age: 0,
  isMale: true,
  productWantToBuy: [],
};

const chatbotReducer = (state = { ...defaultState }, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.SET_NAME:
      return {
        ...newState,
        name: action.payload,
      };
    case Types.SET_PRODUCT_WANT_TO_BUY:
      return {
        ...newState,
        productWantToBuy: action.payload,
      };
    default:
      return {
        ...newState,
      };
  }
};

export default chatbotReducer;
