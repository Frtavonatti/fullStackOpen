import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

import App from './App'
import './index.css'

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer
})

const store = createStore(reducer)
// console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)