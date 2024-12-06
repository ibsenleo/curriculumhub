import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import { Provider } from 'react-redux'
import { router } from './router/router'
import { store } from './store'
import { useHref } from 'react-router-dom'
import { AppRouter } from './AppRouter'

export const CurriculumHubApp = () => {
  return (
    <Provider store={store}>
            <NextUIProvider navigate={router.navigate} useHref={useHref} locale='es-ES' >
                <AppRouter />
            </NextUIProvider>
    </Provider>
  )
}
