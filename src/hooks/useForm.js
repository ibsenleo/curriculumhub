import { useState } from 'react';

/**
 * 
 * @param {*} formData 
 * @returns 
 */
export const useForm = ( formData) => {
  
    const [formState, setFormState] = useState(formData)


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

    const onResetForm = () => {
        setFormState(formData);
    }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}
