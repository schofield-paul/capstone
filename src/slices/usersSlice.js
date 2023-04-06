import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
// const API = '';

export const fetchAllUsers = createAsyncThunk(
  'allUsers',
  async (x, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API + '/api/users');
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchSingleUser = createAsyncThunk(
  'singleUser',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API + `/api/users/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchSitterReview = createAsyncThunk(
  'fetchReview',
  async ({ id, token, reviewId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        API + `/api/users/${id}/reviews/${reviewId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchSitterRating = createAsyncThunk(
  'fetchRating',
  async ({ id, token, ratingId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        API + `/api/users/${id}/ratings/${ratingId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// post new sitter rating
export const postSitterRating = createAsyncThunk(
  'submitRating',
  async ({ id, sitterId, token, sitterRating }, { rejectWithValue }) => {
    try {
      if (!sitterRating) return rejectWithValue('no rating submitted');
      const { data } = await axios.post(
        API + `/api/users/${id}/ratings`,
        { sitterId, rating: sitterRating },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// edit sitter rating
export const editSitterRating = createAsyncThunk(
  'editRating',
  async ({ id, token, ratingId, rating }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        API + `/api/users/${id}/ratings/${ratingId}`,
        { rating },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// delete sitter rating
export const deleteSitterRating = createAsyncThunk(
  'deleteRating',
  async ({ id, token, ratingId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        API + `/api/users/${id}/ratings/${ratingId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// post new sitter review
export const postSitterReview = createAsyncThunk(
  'submitReview',
  async ({ id, sitterId, token, sitterReview }, { rejectWithValue }) => {
    try {
      if (!sitterReview) return rejectWithValue('no rating submitted');
      const { data } = await axios.post(
        API + `/api/users/${id}/reviews`,
        { sitterId, context: sitterReview },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// edit sitter review
export const editSitterReview = createAsyncThunk(
  'editReview',
  async ({ id, token, reviewId, context }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        API + `/api/users/${id}/reviews/${reviewId}`,
        { context },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// delete sitter review
export const deleteSitterReview = createAsyncThunk(
  'deleteReview',
  async ({ id, token, reviewId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        API + `/api/users/${id}/reviews/${reviewId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    allUsers: [],
    singleUser: {},
    allReviews: [],
    singleReview: {},
    allRatings: [],
    singleRating: {},
    status: '',
    error: '',
  },
  reducers: {
    resetUserStatus: (state) => {
      state.status = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.allUsers = payload || [];
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchAllUsers.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchAllUsers.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(fetchSingleUser.fulfilled, (state, { payload }) => {
        state.singleUser = payload || {};
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchSingleUser.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchSingleUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(postSitterRating.fulfilled, (state, { payload }) => {
        state.singleRating = payload || {};
        state.status = 'success';
        state.error = '';
      })
      .addCase(postSitterRating.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(postSitterRating.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(postSitterReview.fulfilled, (state, { payload }) => {
        state.singleReview = payload || {};
        state.status = 'success';
        state.error = '';
      })
      .addCase(postSitterReview.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(postSitterReview.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(deleteSitterReview.fulfilled, (state, { payload }) => {
        state.singleReview = payload || {};
        state.status = 'success';
        state.error = '';
      })
      .addCase(deleteSitterReview.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(deleteSitterReview.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(editSitterReview.fulfilled, (state, { payload }) => {
        state.singleReview = payload || {};
        state.status = 'success';
        state.error = '';
      })
      .addCase(editSitterReview.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(editSitterReview.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(deleteSitterRating.fulfilled, (state, { payload }) => {
        state.singleRating = payload || {};
        state.status = 'success';
        state.error = '';
      })
      .addCase(deleteSitterRating.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(deleteSitterRating.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(editSitterRating.fulfilled, (state, { payload }) => {
        state.singleRating = payload || {};
        state.status = 'success';
        state.error = '';
      })
      .addCase(editSitterRating.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(editSitterRating.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(fetchSitterReview.fulfilled, (state, { payload }) => {
        state.singleReview = payload || {};
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchSitterReview.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchSitterReview.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(fetchSitterRating.fulfilled, (state, { payload }) => {
        state.singleRating = payload || {};
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchSitterRating.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchSitterRating.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      });
  },
});

export const { resetUserStatus } = userSlice.actions;

export const selectUser = (state) => state.users;

export default userSlice.reducer;
