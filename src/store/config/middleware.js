
export const configMiddleware = (store) =>
    (next) => (action) => {
        if ('config/setDarkTheme' == action.type) {
            const configData = JSON.stringify({ isDarkTheme: action.payload })
            localStorage.setItem('ruled-config-data', configData);
        }
        return next(action);
    }