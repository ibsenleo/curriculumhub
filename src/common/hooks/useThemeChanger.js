import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setDarkTheme } from '../../store/config'
import { useEffect } from 'react'

export const useThemeChanger = () => {
    const dispatch = useDispatch()
    const { isDarkTheme } = useSelector((state) => state.config)
    
    const onChangeTheme = (value) => {
        dispatch ( setDarkTheme(value) )
    }

    useEffect(() => {
        const element = document.querySelector("body")
        const theme = isDarkTheme ? 'dark' : 'light'
        element?.classList.remove(...element.classList)
        element?.classList.add(theme, "text-foreground", "bg-background");
    
    }, [isDarkTheme])
    

    return {
        isDarkTheme,
        onChangeTheme
    }
}
