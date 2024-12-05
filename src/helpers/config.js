import { authStatus } from "../utils/const";

const authKey = 'ruled-config-data'

const defaultData = {
    isDarkTheme: false
}

export const loadConfigData = () => {
    
    const configDataString = localStorage.getItem(authKey);
    if(configDataString) {
        const configData = JSON.parse( configDataString )
        return {...configData}
    }
    return defaultData
}