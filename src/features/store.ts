import {configureStore} from '@reduxjs/toolkit';
import shoppingCartReducer from './shoppingCart';
import snacksReducer from './snacks';

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    snacks: snacksReducer,
  },
});

export default store;
