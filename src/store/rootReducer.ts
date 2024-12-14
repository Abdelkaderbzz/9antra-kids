import { combineReducers } from '@reduxjs/toolkit'
import themeReducer from './slices/theme/themeSlice'
import authReducer from './slices/auth/authSlice'
import clientReducer from './slices/clientSlice/clientSlice'

import profileReducer from './slices/profileSlice/profileSlice'
import sittingReducer from './slices/sittingSlice/sittingSlice'

import forgotPasswordReducer from './slices/forgetpassword/forgetPasswordSlice'
import reportsReducer from './slices/Reports/reportsSlice'
import csvFileReducer from './slices/csvFile/csvFileSlice'
import statisticReducer from './slices/statistic/statisticSlice'
import uploadFilesSlice from './slices/uploadFiles/uploadFilesSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  client: clientReducer,
  profile: profileReducer,
  fogotPassword: forgotPasswordReducer,
  reports: reportsReducer,
  csvFile: csvFileReducer,
  statistic: statisticReducer,
  uploadFiles: uploadFilesSlice,
  sitting: sittingReducer,
})

export default rootReducer
