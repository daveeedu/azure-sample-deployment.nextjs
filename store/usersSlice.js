import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res =  await axiosInstance.get('/users');
    return res.data;
});

export const fetchUsersById = createAsyncThunk('users/fetchUsersById', async (id) => {
    const res =  await axiosInstance.get(`/users/${id}`);
    console.log(res)
    return res.data;
});

export const createUser = createAsyncThunk('users/createUser', async (user) => {
    const res = await axiosInstance.post('/users', user);
    return res.data;
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
     await axiosInstance.delete(`/users/${id}`);
    return id;
})

const usersSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        usersById: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // get user
           .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
           .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status ='succeeded';
                state.users = action.payload;
            })
           .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

             // get user by Id
           .addCase(fetchUsersById.pending, (state) => {
            state.status = 'loading';
                })
            .addCase(fetchUsersById.fulfilled, (state, action) => {
                    state.status ='succeeded';
                    console.log(action.payload)
                    state.usersById = action.payload;
                })
            .addCase(fetchUsersById.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                })

            // create user
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
            })
           .addCase(createUser.fulfilled, (state, action) => {
                state.status ='succeeded';
                state.users.push(action.payload)
            })
           .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // delete user
            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading';
            })
           .addCase(deleteUser.fulfilled, (state, action) => {
                state.status ='succeeded';
                state.users = state.users.filter(user => user.id !== action.payload );
            })
           .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const getUserData = ( state ) => state.user

export default usersSlice.reducer;