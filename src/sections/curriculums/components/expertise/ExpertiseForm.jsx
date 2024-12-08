import { Button, DatePicker, Input, Textarea } from '@nextui-org/react'
import React from 'react'
import { useForm } from '../../../../hooks/useForm'
import { parseDate } from '@internationalized/date'
import { useState } from 'react'
import { ConfirmBox } from '../../../../common/components/ConfirmBox'

export const ExpertiseForm = ({ onSubmit, onCancel = () => {}, initialData = {} }) => {


    const {
        formState,
        onInputChange,
        onResetForm,
        isFormEmpty,
        expertiseName,
        expertiseYears,
        expertiseDescription,
    } = useForm({
        expertiseName: "",
        expertiseYears: "",
        expertiseDescription: "",
        ...initialData
    })

    const onSubmitForm = (e) => {
        e.preventDefault();
        onSubmit(formState)
        onResetForm();
    }

    const onCancelForm = () => {
        onCancel(isFormEmpty)
        // onResetForm(); 
    }


    return (
        <div className="grid grid-flow-row gap-3 animate-fade animate-duration-150">
            
            <div className='dark:border-zinc-700 border-zinc-300 border dark:bg-zinc-900 bg-zinc-100  rounded-lg shadow-lg gap-3 p-3'>
                <form onSubmit={onSubmitForm}>
                    <div className='grid grid-cols-2 p-3 gap-3 items-center'>
                        <Input
                            variant='solid'
                            label="Expertise Name"
                            name="expertiseName"
                            labelPlacement="outside"
                            value={expertiseName}
                            onChange={onInputChange}
                        />
                        <Input
                            variant='solid'
                            label="Expertise Years"
                            name="expertiseYears"
                            value={expertiseYears}
                            labelPlacement="outside"
                            onChange={onInputChange}

                        />
                        <Textarea
                            variant='solid'
                            className='col-span-2'
                            label="Expertise Description"
                            name='expertiseDescription'
                            value={expertiseDescription}
                            onChange={onInputChange}
                        />

                        <div className='flex justify-end col-span-2 gap-2'>
                            <Button onClick={onCancelForm}  variant="flat" color='danger'>Cancel</Button>
                            <Button type='submit' color='primary'>{initialData?.id ? "Save" : "Add New"}</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
