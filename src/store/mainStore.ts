import createStore from '@redux/index'
import { ReducerType } from '@redux/types'

const INITIAL_STATE = {
  name: 'Eder',
  age: 20,
}

const reducer: ReducerType<typeof INITIAL_STATE> = (state, action) => {
  switch (action.type) {
    case 'set/name':
      return { ...state, name: action.payload }
    case 'set/age':
      return { ...state, age: action.payload }
    default:
      throw new Error(`Action type '${action.type}' is not defined`)
  }
}

const mainStore = createStore(INITIAL_STATE, reducer)

export default mainStore
