import React from 'react'
import { router } from './router/router'
import { useCheckAuth } from './hooks/useCheckAuth'
import { RouterProvider } from 'react-router-dom'
import { LoadingPage } from './common/components/LoadingPage'
import { authStatus } from './utils/const'
import { useThemeChanger } from './common'

export const AppRouter = () => {
    const {isDarkTheme} = useThemeChanger()
    const status = useCheckAuth()  
    return (
        <main className={` text-foreground bg-background ${isDarkTheme ? 'dark': 'light'}`}>
            {status===authStatus.LOGGING
            ?<LoadingPage/> 
            :<RouterProvider router={router} />}
            
        </main>
    )
}
