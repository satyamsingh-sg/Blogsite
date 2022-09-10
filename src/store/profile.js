import { createSlice } from "@reduxjs/toolkit";

//Intial Profile State with all required fields
const initialProfileState = {
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    genres: [],
    followersList: [],
    followingList: [],
    postIds: [],
    questionIds: [],
    recentActivity: [],
    savedContent: [],
    likedContent: [],
};

const profileSlice = createSlice({
    name: "profileData",
    initialState: initialProfileState, //Intializing the profile intial state
    reducers: {
        // reducers
        update(state, action) {
            // this update function state is used for updating the details of the user
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.bio = action.payload.bio;
            state.genres = action.payload.genres;
            state.postIds = action.payload.postIds;
            state.questionIds = action.payload.questionIds;
            state.followersList = action.payload.followersList;
            state.followingList = action.payload.followingList;
            state.recentActivity = action.payload.recentActivity;
            state.savedContent = action.payload.savedContent;
            state.likedContent = action.payload.likedContent;
        },

        addBookmark(state, action) {
            //addBookmark is used for adding the bookmark of the post/question into the database and store by using post/question id
            return {
                ...state,
                savedContent: [...state.savedContent, action.payload],
            };
        },

        removeBookmark(state, action) {
            //removeBookmark is used for removing the bookmark of the post/question into the database and store by using post/question id
            return {
                ...state,
                savedContent: state.savedContent.filter(
                    (obj) => obj.id !== action.payload.id
                ),
            };
        },

        addLikedContent(state, action) {
            //This function is used for adding the liked id of the post/question by the user  into the database
            return {
                ...state,
                likedContent: [...state.likedContent, action.payload],
            };
        },

        removeLikedContent(state, action) {
            //This function is used for removing the liked id of the post/question by the user into the database
            return {
                ...state,
                likedContent: state.likedContent.filter(
                    (id) => id !== action.payload
                ),
            };
        },
    },
});

export const profileActions = profileSlice.actions; //exporting the actions(update function) by using profileActions

export default profileSlice.reducer; //exporting the reducer
