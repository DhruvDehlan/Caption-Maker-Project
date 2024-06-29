// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  videoUrl: '',
  captions: [],
  currentCaption: null,
  currentId: 1,
};

const captionSlice = createSlice({
  name: 'caption',
  initialState,
  reducers: {
    setVideoUrl: (state, action) => {
      state.videoUrl = action.payload;
      if (action.payload === '') {
        state.captions = [];
        state.currentId = 1;
      }
    },
    addCaption: (state, action) => {
      action.payload.id = state.currentId;
      state.captions.push(action.payload);
      state.currentId += 1;
    },
    editCaption: (state, action) => {
      const index = state.captions.findIndex((caption) => caption.id === action.payload.id);
      if (index !== -1) {
        state.captions[index] = action.payload;
      }
      state.currentCaption = null;
    },
    setCurrentCaption: (state, action) => {
      state.currentCaption = action.payload;
    },
  },
});

export const { setVideoUrl, addCaption, editCaption, setCurrentCaption } = captionSlice.actions;

const store = configureStore({
  reducer: {
    caption: captionSlice.reducer,
  },
});

export default store;
