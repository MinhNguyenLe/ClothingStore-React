import { combineReducers } from 'redux';
import accountReducer from './account/Reducer';
import cartReducer from './cart/Reducer';
import favoritesReducer from './favorites/Reducer';
import chatbotReducer from './chatbot/Reducer';

export default combineReducers({
  accountReducer,
  cartReducer,
  favoritesReducer,
  chatbotReducer
});
