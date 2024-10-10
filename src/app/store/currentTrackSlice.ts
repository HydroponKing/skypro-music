import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface currentTrackState{
    trackIndex: number | null;
}

const initialState: currentTrackState = {
    trackIndex: null,
}

const currentTrackSlice = createSlice({
    name: 'currentTrack',
    initialState,
    reducers:{
        setCurrentTrack(state, action: PayloadAction<number>){
            state.trackIndex = action.payload;
        },
    },
});

export const { setCurrentTrack } = currentTrackSlice.actions
export default currentTrackSlice.reducer;
