import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'http://10.24.4.42:3000/books';
const API_URL = 'http://192.168.1.5:3000/books';
export const fetchBooks = createAsyncThunk('book/fetchBooks', async () => {
  const response = await axios.get(API_URL);
  console.log('Fetch books response:', response.data);
  return response.data;
});

export const addBook = createAsyncThunk('book/addBook', async book => {
  const response = await axios.post(API_URL, book);
  return response.data;
});

export const deleteBook = createAsyncThunk('book/deleteBook', async id => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const updateBook = createAsyncThunk('book/updateBook', async book => {
  const response = await axios.put(`${API_URL}/${book.id}`, book);
  return response.data;
});

const initialState = {
  listBook: [],
  status: 'idle',
  error: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.listBook = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchBooks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.listBook.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.listBook = state.listBook.filter(
          book => book.id !== action.payload,
        );
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const {id, title, mota} = action.payload;
        const book = state.listBook.find(book => book.id === id);
        if (book) {
          book.title = title;
          book.mota = mota;
        }
      });
  },
});

export default bookSlice.reducer;
