import {createSlice} from "@reduxjs/toolkit"

const tweetSlice = createSlice({
    name:"tweet",
    initialState:{
        tweet:null,
        refresh:false,
        isActive:true
        
    },
    reducers:{
        setAllTweet:(state, action)=>{
            state.tweet = action.payload
        },
        setRefresh:(state, action)=>{
            state.refresh = action.payload
        },
        setIsActive:(state, action)=>{
            state.isActive =  action.payload
        },
        
    }
});

export const {setAllTweet, setRefresh,setIsActive} = tweetSlice.actions;
export default tweetSlice.reducer;