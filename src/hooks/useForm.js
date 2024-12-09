import { useEffect } from 'react';
import { useState } from 'react';

/**
 * 
 * @param {*} formData 
 * @returns 
 */
export const useForm = ( formData) => {
  
    const [formState, setFormState] = useState(formData)
    const [isFormEmpty, setIsFormEmpty] = useState(true);


    // Manejar cambios en los campos de texto y otros valores de control
    const onInputChange = (eventOrValue) => {
        if (eventOrValue?.target) {
            // Si proviene de un evento estándar de formulario (e.g., input text)
            const { name, value } = eventOrValue.target;
            setFormState({
                ...formState,
                [name]: value,
            });
        } else {
            // Si proviene de DatePicker u otro componente que no usa un evento estándar
            const { name, value } = eventOrValue;
            setFormState({
                ...formState,
                [name]: value,
            });
        }
    };

    const setValue = (name, value) => {
        console.log(formState)
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const setFormData = (newFormData) => {
        setFormState(newFormData);
    };

    const onResetForm = () => {
        setFormState(formData);
    }

     // Verifica si el formulario está vacío
     useEffect(() => {
        const isEmpty = Object.values(formState).every((value) => !value);
        setIsFormEmpty(isEmpty);
    }, [formState]);


    return {
        ...formState,
        formState,
        isFormEmpty,
        onInputChange,
        onResetForm,
        setValue,
        setFormData,
    }
}
