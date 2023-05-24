import { createSlice } from '@reduxjs/toolkit';

export const globalStoreSlice = createSlice({
  name: 'recordStore',
  initialState: {
    dateRange: {},
    leads: [],
    calls: [],
    demos: [],
    addGoal: [{
      employee: '',
      metric: '',
      month: '',
      goal: '',
      circular: false,
    }],
  },
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setStoredLeads: (state, action) => {
      state.leads = action.payload;
    },
    setStoredCalls: (state, action) => {
      state.calls = action.payload;
    },
    setStoredDemos: (state, action) => {
      state.demos = action.payload;
    },
    setSelectedEmployee: (state, action) => {
      state.addGoal[0].employee = action.payload;
    },
    setMetric: (state, action) => {
      state.addGoal[0].metric = action.payload;
    },
    setMonth: (state, action) => {
      state.addGoal[0].month = action.payload;
    },
    setGoal: (state, action) => {
      state.addGoal[0].goal = action.payload;
    },
    setCircular: (state, action) => {
      state.addGoal[0].circular = action.payload;
    },
  },
});

export const {
  setDateRange,
  setStoredLeads,
  setStoredCalls,
  setStoredDemos,
  setSelectedEmployee,
  setMetric,
  setMonth,
  setGoal,
  setCircular,
} = globalStoreSlice.actions;
export default globalStoreSlice.reducer;
