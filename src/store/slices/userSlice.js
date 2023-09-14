import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    token: null,
    id: null,
    photo: null,
    name: null,
    nickname: null,
    username : null,
    email: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.photo = action.payload.photo;
            state.name = action.payload.name;
            state.nickname = action.payload.nickname;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        removeUser(state) {
            state.token = null;
            state.id = null;
            state.photo = null;
            state.nickname = null;
            state.name = null;
            state.username = null;
            state.email = null;
        },
    },
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer;
