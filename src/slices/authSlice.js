import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logIn = createAsyncThunk(
  'login',
  async (credentials, { rejectWithValue }) => {
    try {
      let { data } = await axios.post('/api/auth/login', credentials);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const attemptTokenLogin = createAsyncThunk(
  'attemptTokenLogin',
  async (x, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem('token');
      if (!token) return {};
      const { data } = await axios.get(`/api/auth`, {
        headers: {
          authorization: token,
        },
      });
      return { data, token };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const signUp = createAsyncThunk(
  'signup',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users', userData);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createAccessData = createAsyncThunk(
  'access',
  async ({ id, zip, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/users/${id}/access`,
        { zip: zip },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    userAuth: {},
    accessData: {},
    error: '',
    status: '',
  },
  reducers: {
    resetAuthStatus: (state) => {
      state.status = '';
      state.error = '';
    },
    logOut: (state) => {
      state.userAuth = {};
      state.token = '';
      state.status = '';
      state.accessData = {};
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.status = 'success';
        state.error = '';
      })
      .addCase(logIn.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(attemptTokenLogin.fulfilled, (state, { payload }) => {
        state.userAuth = payload.data;
        state.status = 'success';
        state.error = '';
        state.token = payload.token;
      })
      .addCase(attemptTokenLogin.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(attemptTokenLogin.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.token = payload.token;
        state.error = '';
      })
      .addCase(signUp.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(createAccessData.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.accessData = payload;
        state.error = '';
      })
      .addCase(createAccessData.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(createAccessData.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      });
  },
});

export const { resetAuthStatus, logOut } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
