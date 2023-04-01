import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const fetchAllPets = createAsyncThunk(
  'userPets',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API + `/api/users/${id}/pets`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchSinglePet = createAsyncThunk(
  'singlePet',
  async (petId, { rejectWithValue }) => {
    const { data } = await axios.get(API + `/api/pets/${petId}`);
    return data;
  }
);

export const fetchPetDetails = createAsyncThunk(
  'petDetails',
  async (petId, { rejectWithValue }) => {
    const { data } = await axios.get(API + `/api/pets/${petId}/details`);
    return data;
  }
);

export const updatePet = createAsyncThunk(
  'updatePet',
  async ({ id, token, petId, petInfo }, { rejectWithValue }) => {
    const { data } = await axios.put(
      API + `/api/users/${id}/pets/${petId}`,
      petInfo,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return data;
  }
);

export const updatePetDetails = createAsyncThunk(
  'updatePetDetails',
  async (
    { id, token, petId, detailsId, petDetailsData },
    { rejectWithValue }
  ) => {
    const { data } = await axios.put(
      API + `/api/users/${id}/pets/${petId}/details/${detailsId}`,
      petDetailsData,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return data;
  }
);

export const addPet = createAsyncThunk(
  'addPet',
  async ({ id, token, petInfo }, { rejectWithValue }) => {
    const { data } = await axios.post(API + `/api/users/${id}/pets`, petInfo, {
      headers: {
        authorization: token,
      },
    });
    return data;
  }
);

export const addPetDetails = createAsyncThunk(
  'addPetDetails',
  async ({ id, token, petId, petDetailsData }, { rejectWithValue }) => {
    const { data } = await axios.post(
      API + `/api/users/${id}/pets/${petId}/details`,
      petDetailsData,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return data;
  }
);

export const deletePet = createAsyncThunk(
  'deletePet',
  async ({ id, token, petId }, { rejectWithValue }) => {
    const { data } = await axios.delete(
      API + `/api/users/${id}/pets/${petId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log(data);
    return data;
  }
);

const petsSlice = createSlice({
  name: 'pets',
  initialState: {
    allPets: [],
    singlePet: {},
    petDetails: {},
    status: '',
    error: '',
  },
  reducers: {
    resetPetStatus: (state) => {
      state.status = '';
      state.error = '';
      state.singlePet = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPets.fulfilled, (state, { payload }) => {
        state.allPets = payload || [];
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchAllPets.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchAllPets.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(fetchSinglePet.fulfilled, (state, { payload }) => {
        state.singlePet = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchSinglePet.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchSinglePet.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(fetchPetDetails.fulfilled, (state, { payload }) => {
        state.petDetails = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchPetDetails.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchPetDetails.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(updatePet.fulfilled, (state, { payload }) => {
        state.singlePet = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(updatePet.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(updatePet.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(updatePetDetails.fulfilled, (state, { payload }) => {
        state.petDetails = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(updatePetDetails.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(updatePetDetails.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(deletePet.fulfilled, (state, { payload }) => {
        state.singlePet = payload.deletedPetBasics;
        state.petDetails = payload.deletedPetDetails;
        state.status = 'success';
        state.error = '';
      })
      .addCase(deletePet.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(deletePet.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(addPet.fulfilled, (state, { payload }) => {
        state.singlePet = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(addPet.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(addPet.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(addPetDetails.fulfilled, (state, { payload }) => {
        state.petDetails = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(addPetDetails.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(addPetDetails.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      });
  },
});

export const { resetPetStatus } = petsSlice.actions;

export const selectPets = (state) => state.pets;

export default petsSlice.reducer;
