import { createSlice } from '@reduxjs/toolkit';

export const globalStoreSlice = createSlice({
  name: 'globalStore',
  initialState: {
    dateRange: {},
    leads: [],
    calls: [],
    demos: [],
    people: [],
    addGoal: [{
      employee: '',
      metric: '',
      month: '',
      goal: '',
      circular: false,
    }],
    update: [{
      employeeId: '',
      employeeName: '',
      profilePicture: '',
      profilePictureS3: '',
      goals: '',
      email: '',
      aloware: '',
      disable: false,
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
    setPeople: (state, action) => {
      state.people = action.payload;
    },
    setUpdateFormEmployeeName: (state, action) => {
      state.update[0].employeeName = action.payload;
    },
    setUpdateFormEmployee: (state, action) => {
      state.update[0].employeeId = action.payload;
    },
    setUpdateFormEmployeePicture: (state, action) => {
      state.update[0].profilePicture = action.payload;
    },
    setUpdateFormEmployeePictureS3: (state, action) => {
      state.update[0].profilePictureS3 = action.payload;
    },
    setUpdateFormEmployeeEmail: (state, action) => {
      state.update[0].email = action.payload;
    },
    setAlowareId: (state, action) => {
      state.update[0].aloware = action.payload;
    },
    setGoals: (state, action) => {
      state.update[0].goals = action.payload;
    },
    setDisable: (state, action) => {
      state.update[0].disable = action.payload;
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
  setPeople,
  setUpdateFormEmployee,
  setUpdateFormEmployeeName,
  setUpdateFormEmployeePicture,
  setUpdateFormEmployeePictureS3,
  setUpdateFormEmployeeEmail,
  setAlowareId,
  setGoals,
  setDisable,
} = globalStoreSlice.actions;
export default globalStoreSlice.reducer;
