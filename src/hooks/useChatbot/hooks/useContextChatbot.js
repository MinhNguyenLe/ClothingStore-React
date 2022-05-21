const useContextChatbot = (state) => {
  const SET_NAME = (name) => {
    return {
      type: 'SET_NAME',
      payload: name,
    };
  };

  const SET_PRODUCT_WANT_TO_BUY = (productWantToBuy) => {
    return {
      type: 'SET_PRODUCT_WANT_TO_BUY',
      payload: productWantToBuy,
    };
  };

  function dispatchChatbot(_action) {
    switch (_action.type) {
      case 'SET_NAME':
        state.name = _action.payload;
        break;
      case 'SET_PRODUCT_WANT_TO_BUY':
        state.productWantToBuy = _action.payload;
        break;
      default: {
        console.log('Error dispatch chatbot !!!');
        break;
      }
    }
  }

  return { SET_NAME, dispatchChatbot, SET_PRODUCT_WANT_TO_BUY };
};

export default useContextChatbot;
