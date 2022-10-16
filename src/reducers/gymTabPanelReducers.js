import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ropePanel: {
    links: {
      left: '/distribution/current/ropes/',
      right: '/distribution/ideal/ropes/',
    },
    titles: {
      left: 'Current Rope Climbs',
      right: 'Ideal Rope Distribution',
    }
  },
  boulderPanel: {
    links: {
      left: '/distribution/current/boulders/',
      right: '/distribution/ideal/boulders/',
    },
    titles: {
      left: 'Current Boulder Problems',
      right: 'Ideal Boulder Distribution',
    },
  },
  sectionPanel: {
    links: {
      left: '/sections/',
      right: '/sections/edit/',
    },
    titles: {
      left: 'View Sections',
      right: 'Edit sections',
    },
  },
}

export const gymTabPanelSlice = createSlice({
  name: 'gym tab panel info',
  initialState,
  reducers: {},
});

export default gymTabPanelSlice.reducer