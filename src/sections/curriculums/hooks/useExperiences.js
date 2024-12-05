import { useState } from 'react'

export const useExperiences = ({ experienceList = [] }) => {
    const [showExpForm, setShowExpForm] = useState(false)
    const [tempIndex, setTempIndex] = useState(0)
    const [experiences, setExperiences] = useState(experienceList)

    const onAddExperience = (value) => {
        setShowExpForm(value);
    }

    const onDeleteExperience = (id) => {
        // Filtra las experiencias para eliminar la que coincide con el ID
        const updatedExperiences = experiences.filter((experience) => experience.id !== id);
        setExperiences(updatedExperiences);
    };

    const onSubmitExperience = (formValue) => {

        const exp = {
            id: "temp" + tempIndex,
            jobTitle: formValue.jobTitle,
            companyName: formValue.companyName,
            startDate: formValue.startDate,
            endDate: formValue.endDate,
            jobDescription: formValue.jobDescription
        }

        setExperiences([...experiences, exp]);
        setTempIndex(tempIndex + 1)
        setShowExpForm(false);
    }



    return {
        onAddExperience,
        onDeleteExperience,
        onSubmitExperience,
        showExpForm,
        experiences
    }
}
