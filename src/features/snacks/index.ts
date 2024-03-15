import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Snack} from '../../interfaces/Snack';

interface snacksState {
  snacks: Snack[];
}

const initialState: snacksState = {
  snacks: [],
};

const snacksSlice = createSlice({
  name: 'snacks',
  initialState,
  reducers: {
    insert: (state, action: PayloadAction<Snack[]>) => {
      state.snacks = action.payload;
    },
  },
});

export const {insert} = snacksSlice.actions;

export default snacksSlice.reducer;
