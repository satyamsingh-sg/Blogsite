import { createSlice } from "@reduxjs/toolkit";

const initialTrendData = {
    data: [],
};

const trendingSlice = createSlice({
    name: "trendData",
    initialState: initialTrendData,
    reducers: {
        addPosts(state, action) {
            state.data = action.payload;
        },
    },
});

export const trendingActions = trendingSlice.actions;

export default trendingSlice.reducer;
