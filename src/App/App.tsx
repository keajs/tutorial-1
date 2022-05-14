import React from 'react'
import './App.scss'
import { Header } from './Header/Header'
import { DemoForm } from './DemoForm/DemoForm'
import { Simple } from './Simple/Simple'
import { LoginForm } from './LoginForm/LoginForm'
import { actions, kea, reducers, path, useValues, selectors, useActions } from 'kea'
import { JsxEmit } from 'typescript'

import type { sceneLogicType } from './AppType'
import { actionToUrl, router, urlToAction } from 'kea-router'

export enum Scene {
  LoginForm = 'login',
  Simple = 'simple',
}

const scenes: Record<Scene, () => JSX.Element> = {
  [Scene.LoginForm]: LoginForm,
  [Scene.Simple]: Simple,
}

export const sceneLogic = kea<sceneLogicType<Scene>>([
  path(['App', 'App']),
  actions({ setScene: (scene: Scene) => ({ scene }) }),
  reducers({
    scene: [
      Scene.LoginForm as Scene,
      {
        setScene: (_, { scene }) => scene,
      },
    ],
  }),
  selectors({
    Component: [(s) => [s.scene], (scene) => scenes[scene]],
  }),

  actionToUrl({ setScene: ({ scene }) => `/${scene}` }),
  urlToAction(({ actions, values }) => ({
    '/': () => {
      router.actions.push('/login')
    },
    '/:scene': ({ scene }) => {
      if (scene && values.scene !== scene) {
        actions.setScene(scene as Scene)
      }
    },
  })),
])

function Menu() {
  const { scene } = useValues(sceneLogic)
  const { setScene } = useActions(sceneLogic)
  return (
    <div style={{ margin: 20 }}>
      {Object.keys(scenes).map((s) => (
        <button key={s} onClick={() => setScene(s as Scene)} style={{ fontWeight: s === scene ? 'bold' : '' }}>
          {s}
        </button>
      ))}
    </div>
  )
}

export function App() {
  const { Component } = useValues(sceneLogic)

  return (
    <div className="App">
      <Header />
      <Menu />
      <div className="App-layout">
        <Component />
      </div>
    </div>
  )
}
