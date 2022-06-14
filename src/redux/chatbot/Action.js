import Types from './Types';

export const SET_NAME = (payload) => {
  return {
    type: Types.SET_NAME,
    payload,
  };
};

export const SET_PRODUCT_WANT_TO_BUY = (payload) => {
  return {
    type: Types.SET_PRODUCT_WANT_TO_BUY,
    payload,
  };
};
