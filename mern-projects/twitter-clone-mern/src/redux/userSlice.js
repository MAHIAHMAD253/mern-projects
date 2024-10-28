import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        otherUsers:null,
        profile:null
    },
    reducers:{
        setUser:(state, action)=>{
            state.user = action.payload
        },
        setOtherUser:(state,action)=>{
            state.otherUsers = action.payload
        },
        setProfile:(state,action)=>{
            state.profile = action.payload
        },
        followingUpDate:(state, action)=>{
            //unfollow
            if(state.user.following.includes(action.payload)){
                state.user.following = state.user.following.filter((itemid)=>{
                    return itemid != action.payload
                })
            }
            else{
                state.user.following.push(action.payload)
            }
        }

    }
});

export const {setOtherUser,setUser, setProfile, followingUpDate} = userSlice.actions;
export default userSlice.reducer;