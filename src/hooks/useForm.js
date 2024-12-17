import { useEffect, useState, useCallback } from 'react';

// Función para comparar fechas
const compareDates = (date1, date2, comparison = 'after') => {
    // Convertir a objetos Date si son strings
    const parsedDate1 = date1 instanceof Date ? date1 : new Date(date1);
    const parsedDate2 = date2 instanceof Date ? date2 : new Date(date2);

    // Eliminar hora para comparación de fechas
    parsedDate1.setHours(0, 0, 0, 0);
    parsedDate2.setHours(0, 0, 0, 0);

    switch (comparison) {
        case 'after':
            return parsedDate1 > parsedDate2;
        case 'before':
            return parsedDate1 < parsedDate2;
        case 'afterOrEqual':
            return parsedDate1 >= parsedDate2;
        case 'beforeOrEqual':
            return parsedDate1 <= parsedDate2;
        case 'equal':
            return parsedDate1.getTime() === parsedDate2.getTime();
        default:
            throw new Error('Comparación de fecha no válida');
    }
};

export const useForm = (formData, validationRules = {}) => {
    const [formState, setFormState] = useState(formData);
    const [isFormEmpty, setIsFormEmpty] = useState(true);
    const [errors, setErrors] = useState({});

    // Función de validación de campo usando useCallback para estabilidad
    const validateField = useCallback((name, value) => {
        const rules = validationRules[name];
        if (!rules) return null;

        // Convierte el valor a string para validaciones de longitud
        const stringValue = value === undefined || value === null ? '' : String(value);

        if (rules.required && (!stringValue || stringValue.trim() === '')) {
            return 'Este campo es obligatorio';
        }

        if (rules.minLength && stringValue.length < rules.minLength) {
            return `Debe tener al menos ${rules.minLength} caracteres`;
        }

        if (rules.maxLength && stringValue.length > rules.maxLength) {
            return `No debe exceder ${rules.maxLength} caracteres`;
        }

        if (rules.pattern && !rules.pattern.test(stringValue)) {
            return rules.message || 'Formato inválido';
        }

        if (rules.dateCompare) {
            const { field, type, message } = rules.dateCompare;
            const compareValue = formState[field];
            
            if (compareValue) {
                const isValid = compareDates(value, compareValue, type);
                if (!isValid) {
                    return message || `La fecha no cumple con la condición de comparación`;
                }
            }
        }

        if (rules.custom) {
            return rules.custom(value);
        }

        return null;
    }, [validationRules, formState]);

    // Validar todo el formulario usando useCallback
    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        Object.keys(formState).forEach(key => {
            const error = validateField(key, formState[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        // Actualiza los errores de forma síncrona
        setErrors(prevErrors => ({
            ...prevErrors,
            ...newErrors
        }));

        return isValid;
    }, [formState, validateField]);

    // Manejar cambios en los campos de texto y otros valores de control
    const onInputChange = (eventOrValue) => {
        let name, value;

        if (eventOrValue?.target) {
            // Si proviene de un evento estándar de formulario (e.g., input text)
            name = eventOrValue.target.name;
            value = eventOrValue.target.value;
        } else {
            // Si proviene de DatePicker u otro componente que no usa un evento estándar
            name = eventOrValue.name;
            value = eventOrValue.value;
        }

        // Actualizar el estado del formulario
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));

        // Validar el campo modificado
        const error = validateField(name, value);
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const setValue = (name, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Validar el campo modificado
        const error = validateField(name, value);
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const setFormData = (newFormData) => {
        setFormState(newFormData);
        // Validar el nuevo conjunto de datos
        validateForm();
    };

    const onResetForm = () => {
        setFormState(formData);
        setErrors({});
    };

    // Verifica si el formulario está vacío
    useEffect(() => {
        const isEmpty = Object.values(formState).every((value) => !value);
        setIsFormEmpty(isEmpty);
    }, [formState]);

    return {
        ...formState,
        formState,
        isFormEmpty,
        errors,
        onInputChange,
        onResetForm,
        setValue,
        setFormData,
        validateForm,
    };
};