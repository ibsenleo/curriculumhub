import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../store'
import { authStatus } from '../utils/const'
import { loadAuthData } from '../helpers/auth'
import { logoutAndReset } from '../store/common'


export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(status === authStatus.LOGGED) return

        //check in localstorage
        const userAuthData = loadAuthData()
        if (userAuthData) {
            switch(userAuthData.status) {
                case authStatus.LOGGED:
                    dispatch( login(userAuthData) )
                    break;
                case authStatus.NOT_LOGGED:
                    break;

                default:
                    dispatch( logoutAndReset() )
            }
        }
        
    }, [])

  return status
}
