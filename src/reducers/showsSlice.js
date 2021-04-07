import { createSlice } from '@reduxjs/toolkit';

export const showsSlice = createSlice({
  name: 'shows',
  initialState: {
    value: '',
    list:[]
  },
  reducers: {
    searchShow: (state, action) => {
      state.value = action.payload;
    },
    refreshList: (state, action) => {
      state.list = action.payload;
    }
  },
});

export const { refreshList, searchShow } = showsSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.shows.value)`
export const currentSearch = state => state.shows.value;
export const currentlist = state => state.shows.list;

export default showsSlice.reducer;
