import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ropePanel: {
    links: {
      left: null,
      right: null,
    },
    titles: {
      left: null,
      right: null,
    }, 
  },
  boulderPanel: {
    links: {
      left: null,
      right: null,
    },
    titles: {
      left: null,
      right: null,
    }, 
  },
  sectionPanel: {
    links: {
      left: null,
      right: null,
    },
    titles: {
      left: null,
      right: null,
    }, 
  },
};

const setGymPanelInfo = (state, action) => {
    state.ropePanel = {
      links: {
        left: '/distribution/current/ropes/',
        right: '/distribution/ideal/ropes/',
      },
      titles: {
        left: 'Current Rope Climbs',
        right: 'Ideal Rope Distribution',
      }
    };
    state.boulderPanel = {
      links: {
        left: '/distribution/current/boulders/',
        right: '/distribution/ideal/boulders/',
      },
      titles: {
        left: 'Current Boulder Problems',
        right: 'Ideal Boulder Distribution',
      },
    };
    state.sectionPanel = {
      links: {
        left: '/sections/',
        right: '/sections/edit/',
      },
      titles: {
        left: 'View Sections',
        right: 'Edit sections',
      },
    };
    state.loaded = true;
  };

export const gymTabPanelSlice = createSlice({
  name: 'gym tab panel info',
  initialState,
  reducers: {
    setGymPanel: setGymPanelInfo,
    removePanel: (state, action) => initialState,
  },
});

export const { setGymPanel, removePanel } = gymTabPanelSlice.actions;

export default gymTabPanelSlice.reducer;