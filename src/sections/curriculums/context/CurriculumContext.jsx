import { createContext, useContext, useState } from 'react';

const CurriculumContext = createContext();

const initialState = {
    experiences: [],
    certifications: [],
    expertise: [],
    skills: [],
}

export const CurriculumProvider = ({ children }) => {
    const [curriculumData, setCurriculumData] = useState(initialState);

    const addItem = (listName, item) => {
        setCurriculumData((prev) => ({
            ...prev,
            [listName]: [...prev[listName], { ...item, id: Date.now() }],
        }));
    };

    const updateItem = (listName, updatedItem) => {
        setCurriculumData((prev) => ({
            ...prev,
            [listName]: prev[listName].map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            ),
        }));
    };

    const deleteItem = (listName, id) => {
        setCurriculumData((prev) => ({
            ...prev,
            [listName]: prev[listName].filter((item) => item.id !== id),
        }));
    };

    const clearAll = () => {
        setCurriculumData(initialState)
    }

    return (
        <CurriculumContext.Provider
            value={{ curriculumData, addItem, updateItem, deleteItem }}
        >
            {children}
        </CurriculumContext.Provider>
    );
};

export const useCurriculum = () => useContext(CurriculumContext);
