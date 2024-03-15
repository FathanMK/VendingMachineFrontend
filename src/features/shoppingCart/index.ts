import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Snack} from '../../interfaces/Snack';

interface shoppingCartItem extends Snack {
  quantity: number;
}

interface shoppingCartState {
  items: shoppingCartItem[];
  total: number;
}

const initialState: shoppingCartState = {
  items: [],
  total: 0,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<shoppingCartItem>) => {
      const {price, id} = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        if (state.total + price > 100000) {
          return;
        }
        existingItem.quantity += 1;
      } else {
        if (state.total + price > 100000) {
          return;
        }
        state.items.push({...action.payload});
      }

      state.total += price;
    },
    remove: (state, action: PayloadAction<shoppingCartItem>) => {
      const {id, price} = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
      }

      state.total -= price;
    },
    removeById: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      const itemToRemove = state.items.find(item => item.id === idToRemove);

      if (itemToRemove) {
        state.total -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter(item => item.id !== idToRemove);
      }
    },
    clearItems: state => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {add, remove, clearItems, removeById} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
