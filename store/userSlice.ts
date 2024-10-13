import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRegistry, fetchLogin, fetchGetToken } from "src/app/components/api";



export const registryThunk = createAsyncThunk('user/registry', async (body : any) => {
    return await fetchRegistry(body)
})

export const loginThunk = createAsyncThunk('user/login', async (body : any) => {
    return await fetchLogin(body)
})

export const getTokenThunk = createAsyncThunk('user/getToken', async (body : any) => {
    return await fetchGetToken(body)
})

const initialState = {
    user: null as any | null,
    error: null as any | null,
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    selectors: {
        getUserState : (state) => state.user,
        getIsLoadingState : (state) => state.isLoading
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(registryThunk.pending, (state)=> {
            state.isLoading = true;
        }).addCase(registryThunk.rejected, (state, action) => {
            state.error = action.payload,
            state.isLoading = false
        }).addCase(registryThunk.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(loginThunk.pending, (state)=> {
            state.isLoading = true;
        }).addCase(loginThunk.rejected, (state, action) => {
            state.error = action.payload,
            state.isLoading = false
        }).addCase(loginThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.data
            localStorage.setItem('user', JSON.stringify(action.payload.data))
        }).addCase(getTokenThunk.pending, (state)=> {
            state.isLoading = true;
        }).addCase(getTokenThunk.rejected, (state, action) => {
            state.error = action.error,
            state.isLoading = false
        }).addCase(getTokenThunk.fulfilled, (state, action) => {
            state.isLoading = false
            localStorage.setItem('token', action.payload.data.access)
            localStorage.setItem('refreshToken', action.payload.data.refresh)
        })
    }
})


export const {getUserState, getIsLoadingState} = userSlice.selectors
export const {setUser} = userSlice.actions
export default userSlice.reducer;