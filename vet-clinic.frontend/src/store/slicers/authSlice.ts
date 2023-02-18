import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Level} from "../../utils/Level";


export interface AuthState {
  level: Level
}

const initialState: AuthState = {
  level: Level.Unauthozized,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    unauthorize: (state) => {
      state.level = 0
    },
    authorize: (state, action:PayloadAction<Level>) => {
      state.level = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { unauthorize, authorize } = authSlice.actions

export default authSlice.reducer