import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    user : null,
    isAuth : false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        register (state, action){
            state.user = action.payload;
            state.isAuth = true;
        },
        login(state, action){
            state.user = action.payload;
            state.isAuth = true;
        },
        logout(state){
            state.user = null;
            state.isAuth = false;
        }
    } 
}); 

export const {register, login, logout} = authSlice.actions;
export default authSlice.reducer;