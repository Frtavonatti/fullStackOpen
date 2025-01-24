import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

import { beforeEach, describe, test, expect } from '@jest/globals'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  describe('when one button is clicked', () => {
    let newState;
    beforeEach(() => {
      const action = {
        type: 'GOOD'
      }
      const state = initialState
      deepFreeze(state)
      newState = counterReducer(state, action)
    });
    
    test('good is incremented', () => {
      expect(newState).toEqual({
        good: 1,
        ok: 0,
        bad: 0
      })
    })

    test('reset sets every state to zero', () => {
      const action = {
        type: 'ZERO'
      }

      const state = newState
  
      deepFreeze(state)
      const resetState = counterReducer(state, action)
      expect(resetState).toEqual({
        good: 0,
        ok: 0,
        bad: 0
      })
    })

  })
})