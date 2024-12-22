import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

import App from './App'
import './index.css'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer
  }
})
// console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)