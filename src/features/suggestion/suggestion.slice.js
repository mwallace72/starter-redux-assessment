import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion =
  createAsyncThunk(/* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
    'suggestion/fetch',
    async (thunkAPI) => {
      const response = await fetch('http://localhost:3004/api/suggestion')
      console.log(response, response.body, response.data, response.json)
      return response.json()
    }
  );

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchSuggestion.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload.data)
      state.suggestion = action.payload.data
      state.loading = false
      state.error = false
    })
    builder.addCase(fetchSuggestion.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchSuggestion.rejected, (state, action) => {
      state.error = true
    })
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
