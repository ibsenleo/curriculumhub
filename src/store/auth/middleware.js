
export const authMiddleware = (store) =>
    (next) => (action) => {
        if ('auth/login' == action.type) {
            const {user, jwt} = action.payload;
            const ud = {
                id: user.id,
                username: user.username,
                token: jwt,
                email: user.email,
                avatar: user.avatar,
                firstName: user.first_name,
                lastName: user.last_name
            }
            const userData = JSON.stringify(ud)
            localStorage.setItem('user-auth-data', userData);
        } else if ('auth/logout' == action.type) {
            localStorage.removeItem('user-auth-data');
        }
        return next(action);
    }
