import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

// import { persistStore } from 'redux-persist'

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})
// export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
