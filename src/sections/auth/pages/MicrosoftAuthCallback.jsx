import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useJwtValidator } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { login } from '../../../store';
import { Spinner } from '@nextui-org/react';


export const MicrosoftAuthCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(window.location.search);
    const jwt = queryParams.get('jwt');
    const signature = queryParams.get('signature')

    const handleSuccess = (userData) => {
        // Guardar el JWT y los datos del usuario en localStorage o un estado global
        // localStorage.setItem('token', jwt);
        // localStorage.setItem('user', JSON.stringify(userData));

        dispatch(login({jwt, user:userData}))

        // Redirigir al usuario a la página principal
        // navigate('/');
    };

    const handleFailure = () => {
        console.error('Error: Invalid token or signature');
        console.error(error);
        navigate('/auth/login', { replace: true });
    };

    const { loading, error } = useJwtValidator(jwt, signature, handleSuccess, handleFailure);

    return (

        <div className="flex items-center justify-center min-h-screen dark:bg-zinc-800 bg-zinc-100">
            <div className="flex gap-4">
                <div>
                    {loading ? 'Validando autenticación...' : error ? 'Error al validar el JWT.' : 'Redirigiendo...'}
                </div>
                {loading && <Spinner size="lg" />}
            </div> 
        </div>
        
    );
}
