import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { playerReducer } from './reducers/player.reducer'

const rootReducer = combineReducers({
  player: playerReducer,
})

export default configureStore({
  reducer: rootReducer,
})