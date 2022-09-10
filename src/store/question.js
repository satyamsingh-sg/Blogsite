import { createSlice } from "@reduxjs/toolkit";

//initial state of question details
const initialQuestionState = {
    questionId: "",
    likes: 0,
    userId: "",
    publishedDate: "",
    question: "",
    imageUrl: "",
    description: "",
    comments: [],
    bookmarks: 0,
    status: "active",
    author: "",
};

const questionSlice = createSlice({
    name: "questionmData",
    initialState: initialQuestionState, //intializing the intial state in this store
    reducers: {
        add(state, action) {
            //adding the question details into the store
            state.questionId = action.payload.questionId; //question id
            state.userId = action.payload.userId; //user id of the question created user
            state.publishedDate = action.payload.publishedDate; //published date of the question
            state.question = action.payload.question; //question text
            state.imageUrl = action.payload.imageUrl; //imageurl of the question data
            state.description = action.payload.description; //description of the question
            state.likes = action.payload.likes; //number of the likes for the question
            state.comments = action.payload.comments; //comments for the question
            state.bookmarks = action.payload.bookmarks; //no.of bookmarks for the question
            state.status = action.payload.status; //status of the question
            state.author = action.payload.author; //author of the created user
        },
    },
});

export const questionActions = questionSlice.actions; //exporting the reducers

export default questionSlice.reducer; //exporting the store
