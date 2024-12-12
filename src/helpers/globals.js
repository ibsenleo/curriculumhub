export const camelToSnakeDeep = (obj) => {
    const toSnakeCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

    if (Array.isArray(obj)) {
        // Si es un array, aplica la transformación a cada elemento
        return obj.map((item) => camelToSnakeDeep(item));
    } else if (obj && typeof obj === 'object') {
        // Si es un objeto, transforma sus claves y aplica recursivamente
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                toSnakeCase(key),
                camelToSnakeDeep(value),
            ])
        );
    }
    // Si es un valor primitivo, retorna tal cual
    return obj;
};

export const snakeToCamelDeep = (obj) => {
    const toCamelCase = (str) => str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

    if (Array.isArray(obj)) {
        // Si es un array, aplica la transformación a cada elemento
        return obj.map((item) => snakeToCamelDeep(item));
    } else if (obj && typeof obj === 'object') {
        // Si es un objeto, transforma sus claves y aplica recursivamente
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                toCamelCase(key),
                snakeToCamelDeep(value),
            ])
        );
    }
    // Si es un valor primitivo, retorna tal cual
    return obj;
};

export const camelToSnakeDeepWithoutId = (obj) => {
    const toSnakeCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

    if (Array.isArray(obj)) {
        // Si es un array, aplica la transformación a cada elemento
        return obj.map((item) => camelToSnakeDeepWithoutId(item));
    } else if (obj && typeof obj === 'object') {
        // Si es un objeto, transforma sus claves y filtra los campos 'id'
        return Object.fromEntries(
            Object.entries(obj)
                .filter(([key]) => key !== 'id') // Elimina las claves 'id'
                .map(([key, value]) => [
                    toSnakeCase(key),
                    camelToSnakeDeepWithoutId(value), // Aplica recursión a los valores
                ])
        );
    }
    // Si es un valor primitivo, retorna tal cual
    return obj;
};