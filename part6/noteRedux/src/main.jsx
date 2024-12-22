// import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit' // import { createStore, combineReducers } from 'redux'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import './index.css'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
