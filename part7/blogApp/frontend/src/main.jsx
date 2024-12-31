import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificactionSlice from './reducers/notificationReducer'
import App from './App'
import './index.css'

const store = configureStore({
  reducer: {
    notification: notificactionSlice
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
