import { Button, Input, Link, Spacer } from '@nextui-org/react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from '../../../hooks/useForm';
import { actionLogIn } from '../../../store/auth/thunks';
import { authStatus } from '../../../utils/const';
import { AuthLayout } from '../layouts/AuthLayout';
import { MicrosoftIcon } from '../../../utils/icons';
import { MicrosoftLoginButton } from 'react-social-login-buttons';


export const LoginPage = () => {

    const {username, password, onInputChange, onResetForm } = useForm({
        username:'',
        password:''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, error} = useSelector(state => state.auth)

    const isAuthenticating = useMemo(()=>status === authStatus.LOGGING, [status]);

    const onSubmitForm = async (e)=> {
        e.preventDefault();

        const userData = {
            username,
            password
        }
        try {
            dispatch(actionLogIn(username, password));
            onResetForm()
        }
        catch (e) {
            console.log(e)
        }
        
    }

    const onMicrosoftLogin = () => {
        window.location.href = 'http://localhost:3001/auth/login';
        return null;
    }


    return (

        <AuthLayout>
            <form className="flex flex-col gap-4" onSubmit={onSubmitForm}>
                <Input
                    name="username"
                    label="Username/Email"
                    type="text"
                    fullWidth
                    value={username}
                    onChange={onInputChange}
                />
                <Input
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={onInputChange}
                />
                { error && 
                <p className="text-center text-sm text-danger antialiased" color='primary'><b>Error: </b>{error}</p>
                }
                
                <Button type="submit" color="primary" isDisabled={isAuthenticating}>
                    Sign In
                </Button>
            </form>
            <Spacer y={3} />
            <div className='flex justify-center'>
                <span>or</span>
            </div>
            <Spacer y={3} />
            
            <div className='flex justify-center'>
                {/* <Button onClick={onMicrosoftLogin}><MicrosoftIcon className="text-primary"/></Button> */}
                <MicrosoftLoginButton size='50px' style={{fontSize:"15px"}} onClick={onMicrosoftLogin}>Login with Microsoft</MicrosoftLoginButton>
            </div>
            <Spacer y={6} />
        
            <div className="text-center">
                <Link href='/auth/register'>
                    Register an account
                </Link>
            </div>
            <Spacer y={1} />
            <div className="text-center">
                <Link href='/auth/register'>
                    Forgot your password?
                </Link>
            </div>
            
        </AuthLayout>
    )
}
