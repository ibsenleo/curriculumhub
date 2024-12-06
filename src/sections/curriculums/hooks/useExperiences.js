import { useCallback } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'

export const useExperiences = ({ experienceList = [] }) => {
    const [showExpForm, setShowExpForm] = useState(false)
    const [experiences, setExperiences] = useState(experienceList)

    const setShowExperienceForm = (value) => {
        setShowExpForm(value);
    }

    const onDeleteExperience = (id) => {
        // Filtra las experiencias para eliminar la que coincide con el ID
        const updatedExperiences = experiences.filter((experience) => experience.id !== id);
        setExperiences(updatedExperiences);
    };

    const onEditExperience = useCallback((updatedExp) => {
        const updatedExperiences = experiences.map((e) =>
            e.id === updatedExp.id ? { ...e, ...updatedExp } : e
        );
        setExperiences(updatedExperiences);
    }, [experiences]);

    const onSubmitExperience = (experienceData) => {
        console.log(experienceData.id);
        (experienceData.id) 
            ? onEditExperience(experienceData)
            : onAddExperience(experienceData)

        setShowExpForm(false);
    }

    const onAddExperience = (exp) => {
        setExperiences([...experiences, { ...exp, id: `temp-${Date.now()}` }]);
    };

    const sortedExperiences = useMemo(() => {
        return [...experiences].sort((a, b) => {
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);
            return dateB - dateA;
        });
    }, [experiences]);



    return {
        setShowExperienceForm,
        onDeleteExperience,
        onEditExperience,
        onSubmitExperience,
        showExpForm,
        experiences: sortedExperiences
    }
}
