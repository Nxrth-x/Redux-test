export type ActionType = {
  type: string
  payload: any
}

export type ReducerType<T> = (state: T, action: ActionType) => T
export type SubscriberType<T> = (state: T) => void
export type UnsubscribeType = () => void
export type CleanupFunctionType = () => UnsubscribeType

export type StoreType<T> = {
  state: T
  dispatch: (action: ActionType) => void
  subscribe: (subscriber: SubscriberType<T>) => UnsubscribeType
}
