import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRegistry } from "src/app/components/api";



export const registryThunk = createAsyncThunk('user/registry', async (body : any) => {
    return await fetchRegistry(body)
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
    reducers: {},
    extraReducers:(builder) =>{
        builder.addCase(registryThunk.pending, (state)=> {
            state.isLoading = true;
        }).addCase(registryThunk.rejected, (state, action) => {
            state.error = action.payload,
            state.isLoading = false
        }).addCase(registryThunk.fulfilled, (state) => {
            state.isLoading = false
        })
    }
})


export const {getUserState, getIsLoadingState} = userSlice.selectors
export default userSlice.reducer;