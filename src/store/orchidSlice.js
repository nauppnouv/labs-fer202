import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./orchidApi";

// Async Thunks
export const fetchOrchids = createAsyncThunk(
  "orchids/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.getOrchids();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addOrchid = createAsyncThunk(
  "orchids/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.createOrchid(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const editOrchid = createAsyncThunk(
  "orchids/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.updateOrchid(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeOrchid = createAsyncThunk(
  "orchids/remove",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteOrchid(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  currentOrchid: null,
};

const orchidSlice = createSlice({
  name: "orchids",
  initialState,
  reducers: {
    setCurrentOrchid: (state, action) => {
      state.currentOrchid = action.payload;
    },
    clearCurrentOrchid: (state) => {
      state.currentOrchid = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchOrchids.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrchids.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchOrchids.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add
      .addCase(addOrchid.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Edit
      .addCase(editOrchid.fulfilled, (state, action) => {
        const idx = state.items.findIndex((o) => o.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      // Remove
      .addCase(removeOrchid.fulfilled, (state, action) => {
        state.items = state.items.filter((o) => o.id !== action.payload);
      });
  },
});

export const { setCurrentOrchid, clearCurrentOrchid } = orchidSlice.actions;

export const selectAllOrchids = (state) => state.orchids.items;
export const selectOrchidStatus = (state) => state.orchids.status;
export const selectOrchidError = (state) => state.orchids.error;

export default orchidSlice.reducer;
