import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: null,
}

export const userAuthTokenSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUserToken: (state, action)=>{
        state.accessToken = action.payload
    },
    unsetUserToken: (state)=>{
        state.accessToken = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserToken, unsetUserToken } = userAuthTokenSlice.actions

export default userAuthTokenSlice.reducer