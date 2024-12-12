import React from 'react'
import { CurriculumProvider, useCurriculum } from '../context/CurriculumContext'
import { useState } from 'react';
import { cloneElement } from 'react';
import { Button, Divider } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/16/solid';
import { ConfirmBox } from '../../../common/components/ConfirmBox';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useConfirmBox } from '../../../common/hooks/useConfirmBox';

export const CurriculumItemsList = ({ listName,  renderItem, children }) => {
    const { curriculumData, addItem, updateItem, deleteItem } = useCurriculum();
    const [editingItem, setEditingItem] = useState(null); // Elemento que se está editando
    const [showForm, setShowForm] = useState(false)
    
    const {
        isOpen: isModalOpen,
        modalConfig,
        openModal,
        closeModal,
        executeModalAction,
    } = useConfirmBox();



    const handleEdit = (item) => {
        setEditingItem(item); // Activa el modo edición con el elemento actual
        setShowForm(true)
    };

    
    const handleSubmit = (item) => {
        
        if (editingItem) {
            updateItem(listName, item);
        } else {
            addItem(listName, item);
        }
        setEditingItem(null); // Limpia el estado de edición después de guardar
        setShowForm(false)
    };

    const handleDelete = (id) => {
        openModal(
            (actionArgs) => deleteItem(listName, actionArgs),
            'Are you sure you want to delete this item?',
            'Delete Confirmation',
            id
        );
    };

    const handleCancel = (isFormEmpty = true) => {
        if (!isFormEmpty) {
            openModal(
                () => setShowForm(false), 
                'Are you sure you want to discard the changes?', 
                'Discard Changes'
            );
            setEditingItem(null);
        } else {
            setShowForm(false);
            setEditingItem(null);
        }
    };

    const onAddItemButton = () => {
        setShowForm(true)
    }


    return (
        <div className='mb-10 '>
            <Divider className='mb-3'/>
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
            <ConfirmBox 
             isOpen={isModalOpen}
             onAccept={executeModalAction}
             onCancel={closeModal}
             message={modalConfig.message}
             title={modalConfig.title}
            />
        <div>
            {(children && showForm) && cloneElement(children, {
                    initialData: editingItem || {}, 
                    onSubmit: handleSubmit, 
                    onCancel: handleCancel
                } 
            )}
        </div>
        {curriculumData[listName].length == 0 && (<div className='flex justify-center text-2xl dark:text-zinc-600 text-zinc-400 font-thin m-10'>No {listName} yet</div>)}
        <div>
            {curriculumData[listName].map((item) =>
                renderItem(item, handleEdit, handleDelete)
            )}
        </div>
        
    </div>
    );
}
