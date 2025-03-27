import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
    name: 'requests',
  initialState: [], // ✅ Set to an empty array
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: () => null
  },
})


export const {addRequest ,removeRequest } = requestSlice.actions;
export default requestSlice.reducer;