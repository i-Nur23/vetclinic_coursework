import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Level} from "../../utils/Level";


export interface AuthState {
  id: string | null
  level: Level
}

const initialState: AuthState = {
  id: null,
  level: Level.Unauthozized,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    unauthorize: (state) => {
      state.id = null;
      state.level = 0
    },
    authorize: (state, action:PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.level = action.payload.level;
    }
  },
})

// Action creators are generated for each case reducer function
export const { unauthorize, authorize } = authSlice.actions

export default authSlice.reducer