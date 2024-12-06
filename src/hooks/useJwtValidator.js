import { useState, useEffect } from 'react';
import { restApi } from '../services/restapi';
import { jwtDecode } from 'jwt-decode';


const validateSignature = (signature) => {
    if (!signature) {
      throw new Error('Falta la firma para la validación.');
    }

    try {
      // Decodificar el JWT utilizando jwt-decode
      const decoded = jwtDecode(signature);
      return decoded; // Devolver los datos decodificados si la decodificación tiene éxito
    } catch (error) {
      console.error('Firma inválida:', error.message);
      throw new Error('Firma inválida, petición rechazada');
    }
  };



export const useJwtValidator = (jwt, signature, onSuccess, onFailure) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasValidated, setHasValidated] = useState(false);

    useEffect(() => {

        if (hasValidated) {
            return;
        }
        

        const validateJwtInStrapi = async () => {
            try {

                // Validates jwt
                if (!jwt) {
                    throw new Error('No JWT provided');
                }

                // Primero valida la firma antes de proceder a la validación del JWT
                if (!signature) {
                    throw new Error('No signature provided');
                }

                setLoading(true)
                validateSignature(signature);

                // Procede a validar el JWT con Strapi si la firma es válida
                const response = await restApi('/users/me', {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                
                onSuccess(response.data); // Llama al callback de éxito con los datos del usuario
            } catch (error) {
                setError(error);
                onFailure(); // Llama al callback de error si la validación falla
            } finally {
                setHasValidated(true);
                setLoading(false);
            }

            // Si cualquiera de los JWTs no está presente, mostrar el error apropiado
            if (!jwt || !signature) {
                setError(new Error('Missing jwt or signature'));
                setLoading(false);
                return;
            }
        };

        validateJwtInStrapi();
    }, [hasValidated]);

    return { loading, error };
};
