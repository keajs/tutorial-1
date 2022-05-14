import { actions, kea, path, reducers, listeners, useActions, useValues, afterMount, beforeUnmount } from 'kea'
import React from 'react'

import type { simpleLogicType } from './SimpleType'

export const simpleLogic = kea<simpleLogicType>([
  path(['App', 'Simple', 'Simple']),
  actions({
    increment: true,
    decrement: true,
  }),
  reducers({
    counter: [
      0,
      {
        increment: (state) => state + 1,
        decrement: (state) => state - 1,
      },
    ],
  }),
  listeners({
    increment: async (_, breakpoint) => {
      console.log('added a number')
      await breakpoint(1000)
      console.log('waited a second')
    },
  }),
  afterMount(({ actions, cache }) => {
    cache.interval = window.setInterval(() => {
      actions.increment()
    }, 1000)
  }),
  beforeUnmount(({ cache }) => {
    cache.interval && window.clearInterval(cache.interval)
  }),
])

export function Simple() {
  const { increment, decrement } = useActions(simpleLogic)
  const { counter } = useValues(simpleLogic)

  return (
    <div>
      <div>Coutner: {counter}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
