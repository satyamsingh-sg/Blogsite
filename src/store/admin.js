import { createSlice } from "@reduxjs/toolkit";

const initialAdminData = {
    users: [],
    posts: [],
    questions: [],
};

const adminSlice = createSlice({
    name: "admin",
    initialState: initialAdminData,
    reducers: {
        setUsers(state, action) {
            return {
                ...state,
                users: action.payload,
            };
        },
        setPosts(state, action) {
            return {
                ...state,
                posts: action.payload,
            };
        },
        setQuestions(state, action) {
            return {
                ...state,
                questions: action.payload,
            };
        },
    },
});

export const adminActions = adminSlice.actions;

export default adminSlice.reducer;
