import { useState } from 'react'
import {
  ActionType,
  CleanupFunctionType,
  ReducerType,
  StoreType,
  SubscriberType,
  UnsubscribeType,
} from './types'

const createStore = <T>(
  initialState: T,
  reducer: ReducerType<T>
): StoreType<T> => {
  let subscribers: Array<SubscriberType<T>> = []

  let state = {
    ...initialState,
  }

  const dispatch = (action: ActionType) => {
    state = reducer(state, action)
    subscribers.forEach(subscriber => subscriber(state))
  }

  const subscribe = (subscriber: SubscriberType<T>): UnsubscribeType => {
    subscribers.push(subscriber)

    return () => {
      subscribers = subscribers.filter(
        _subscriber => subscriber !== _subscriber
      )
    }
  }

  return {
    get state() {
      return { ...state }
    },
    dispatch,
    subscribe,
  }
}

export const useStore = <T>(
  store: StoreType<T>,
  keys: Array<keyof T>
): [T, CleanupFunctionType] => {
  const [state, setState] = useState(store.state)

  const unsubscribe = store.subscribe(newState => {
    for (const key of keys) {
      if (state[key] != newState[key]) {
        setState(newState)
      }
    }
  })

  const cleanupFunction = () => unsubscribe

  return [state, cleanupFunction]
}

export default createStore
