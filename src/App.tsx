import React, { useEffect } from 'react'
import { useStore } from '@redux/index'
import mainStore from '@store/mainStore'

const App: React.FC = () => {
  const [store, unsubscribe] = useStore(mainStore, ['name'])

  const changeName = () => {
    mainStore.dispatch({ type: 'set/name', payload: 'Edinho' })
  }

  useEffect(unsubscribe, [])

  return (
    <div>
      <h1>Hello, {store.name}!</h1>
      <p>You are {store.age} years old.</p>
      <button onClick={changeName}>Change name</button>
    </div>
  )
}

export default App
