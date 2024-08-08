import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import usersReducer from './usersSlice'

const makeStore = () =>
configureStore({
    reducer: {
        user: usersReducer
    },
});

export const wrapper = createWrapper(makeStore);