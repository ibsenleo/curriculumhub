import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const GoBackButton = () => {
    const [history, setHistory] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Almacenar la ruta actual en el historial cada vez que cambie la ubicación
    useEffect(() => {
        setHistory((prevHistory) => [...prevHistory, location.pathname]);
    }, [location]);

    const handleGoBack = () => {
        if (history.length > 1) {
            // Eliminar la última entrada ya que se está retrocediendo
            setHistory((prevHistory) => prevHistory.slice(0, -1));
            navigate(-1);
        }
    };
    
    //TODO: REFACTOR TO SAVE HISTORY IN STORE
    return (<>
        {history.length > 1 &&
            (<Button isIconOnly onClick={handleGoBack}>
                <ArrowLeftIcon className="size-6 "/>            
                </Button>)
        }
        </>)
}
