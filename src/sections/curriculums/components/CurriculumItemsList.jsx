import React from 'react'
import { CurriculumProvider, useCurriculum } from '../context/CurriculumContext'
import { useState } from 'react';
import { cloneElement } from 'react';
import { Button } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/16/solid';

export const CurriculumItemsList = ({ listName,  renderItem, children }) => {
    const { curriculumData, addItem, updateItem, deleteItem } = useCurriculum();
    const [editingItem, setEditingItem] = useState(null); // Elemento que se está editando
    const [showForm, setShowForm] = useState(false)

    
    const handleSubmit = (item) => {
        console.log(item);
        
        if (editingItem) {
            updateItem(listName, item);
        } else {
            addItem(listName, item);
        }
        setEditingItem(null); // Limpia el estado de edición después de guardar
        setShowForm(false)
    };

    const handleEdit = (item) => {
        console.log(item)
        setEditingItem(item); // Activa el modo edición con el elemento actual
        setShowForm(true)
    };

    const handleDelete = (id) => {
        deleteItem(listName, id);
    };

    const handleCancel = () => {
        setShowForm(false)
    }

    const onAddItemButton = () => {
        setShowForm(true)
    }

    return (
        <div className='mb-5'>
            <div className='grid grid-flow-col items-center mb-5'>
                <div className='text-xl'>{listName.charAt(0).toUpperCase() + listName.slice(1)}</div>
                <div className='flex  justify-end'>
                    <Button
                        onClick={onAddItemButton}
                        endContent={<PlusIcon  className="size-6 "/>}
                        isIconOnly
                        >
                        </Button>
                </div>
            </div>

        <div>
            {(children && showForm) && cloneElement(children, {initialData: editingItem || {}, onSubmit: handleSubmit, onCancel: handleCancel} )}
        </div>
        <div>
            {curriculumData[listName].map((item) =>
                renderItem(item, handleEdit, handleDelete)
            )}
        </div>
        
    </div>
    );
}
