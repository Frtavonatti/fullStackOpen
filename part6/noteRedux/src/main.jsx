// import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
// import { createNote } from './reducers/noteReducer'
// import { filterChange } from './reducers/filterReducer'
import './index.css'

// El reducer combinado funciona de tal manera que cada acción es controlada en cada parte del reducer combinado, 
// o en otras palabras, cada reducer "escucha" a todas las acciones despachadas
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)
console.log(store.getState())

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
