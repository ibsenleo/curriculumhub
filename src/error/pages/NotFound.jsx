import { Button, Card, Spacer } from '@nextui-org/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/',{replace:true}); // Redirige a la página principal
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Card className="max-w-md p-10 text-center">
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary">
                    404
                </h1>
                <h3 className="mt-4 text-2xl text-gray-700 dark:text-gray-100">
                    ¡Vaya! Página no encontrada.
                </h3>
                <Spacer y={1} />
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    La página que buscas no existe o ha sido movida.
                </p>
                <Spacer y={1.5} />
                <Button color="primary" auto onClick={handleGoBack}>
                    Volver al inicio
                </Button>
            </Card>
        </div>
    )
}
