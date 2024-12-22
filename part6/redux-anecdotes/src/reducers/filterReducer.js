const initialState = {
  textInput: ''
}

const filterReducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  if (action.type === 'FILTER') {
    return {
      ...state,
      textInput: action.payload.textInput
    }
  } else {
    return state
  }
}

//Actions
export const filterAnecdotes = (textInput) => {
  return {
    type: 'FILTER',
    payload: { textInput }
  }
}

export default filterReducer
