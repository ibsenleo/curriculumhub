import { parseDate } from '@internationalized/date';
import { Button, DatePicker, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from '../../../../hooks/useForm';


export const EducationForm = ({ onSubmit, onCancel = () => { }, initialData = {} }) => {


    const {
        formState,
        onInputChange,
        onResetForm,
        isFormEmpty,
        degree,
        institution,
        startYear,
        endYear,
        description
    } = useForm({
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
        description: "",
        ...initialData
    })

    const onSubmitForm = (e) => {
        e.preventDefault();
        onSubmit(formState)
        onResetForm();
    }

    const onCancelForm = () => {
        console.log("HOLA")
        onCancel(isFormEmpty)
    }


    return (
        <div className="grid grid-flow-row gap-3 animate-fade animate-duration-150">
            <div className=' dark:bg-zinc-900 bg-zinc-100  rounded-lg shadow-lg gap-3 p-3'>
                <form onSubmit={onSubmitForm}>
                    <div className='grid grid-cols-2 p-3 gap-3 items-center'>
                        <Input
                            variant='solid'
                            label="Degree"
                            name="degree"
                            size="sm"
                            value={degree}
                            onChange={onInputChange}
                        />

                        <Input
                            variant='solid'
                            label="Institution"
                            name="institution"
                            size="sm"
                            value={institution}
                            onChange={onInputChange}
                        />

                        <DatePicker
                            showMonthAndYearPickers
                            variant='solid'
                            label="Start Date"
                            name='startYear'
                            value={startYear ? parseDate(startYear) : null}
                            onChange={(date) => onInputChange({ name: 'startYear', value: date.toString() })}
                        />

                        <DatePicker
                            showMonthAndYearPickers
                            variant='solid'
                            label="End Date"
                            name='endYear'
                            value={endYear ? parseDate(endYear) : null}
                            onChange={(date) => onInputChange({ name: 'endYear', value: date.toString() })}

                        />

                        <Textarea
                            variant='solid'
                            className='col-span-2'
                            label="Description"
                            name='description'
                            value={description}
                            onChange={onInputChange}
                        />

                        <div className='flex justify-end col-span-2 gap-2'>
                            <Button onClick={onCancelForm} variant="flat" color='danger'>Cancel</Button>
                            <Button type='submit' color='success'>{initialData?.id ? "Save" : "Add New"}</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
