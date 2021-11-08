import { configureStore } from '@reduxjs/toolkit'

import rushingStatsReducer from './reducer'


const store = configureStore({
  reducer: {
    rushingStats: rushingStatsReducer
  }
})

export default store
