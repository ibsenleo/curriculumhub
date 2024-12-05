import { Switch } from '@nextui-org/react'
import React from 'react'
import { useThemeChanger } from '../hooks/useThemeChanger'
import { MoonIcon, SunIcon } from '../../utils/icons'



export const ThemeChanger = ({label = ''}) => {
    const {isDarkTheme, onChangeTheme} = useThemeChanger()

    const onChangeThemeLocal = ({target}) => {
        onChangeTheme(target.checked)
    }

    return (
        <Switch
            defaultSelected={isDarkTheme}
            size="lg"
            color="default"
            thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                    <MoonIcon className={`${className} text-zinc-600`} />
                ) : (
                    <SunIcon className={`${className} text-zinc-600`} />
                )
                
            }
            onChange={onChangeThemeLocal}
        >
            {label}
        </Switch>

    )
}
