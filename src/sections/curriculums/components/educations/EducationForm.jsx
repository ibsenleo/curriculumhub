import { parseDate } from '@internationalized/date';
import { Button, DatePicker, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from '../../../../hooks/useForm';


export const EducationForm = ({ onSubmit, onCancel = () => { }, initialData = {} }) => {

    const validationRules = {
        // nombre: {
        //     required: true,
        //     minLength: 2,
        //     maxLength: 50
        // },
        // email: {
        //     required: true,
        //     pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        //     message: 'Email inválido'
        // },
        // edad: {
        //     custom: (value) => {
        //         return (value < 18) ? 'Debes ser mayor de edad' : null;
        //     }
        // }
        degree: {
            required: true,
            minLength: 3
        },
        institution: {
            required: true
        },
        startYear: {
            required: true,
            dateCompare: {
                field: 'endYear',  
                type: 'before',    
                message: 'La fecha de inicio debe ser anterior a la fecha final'
            }
        },
    };

    const {
        formState,
        errors,
        onInputChange,
        onResetForm,
        isFormEmpty,
        degree,
        institution,
        startYear,
        endYear,
        description,
        validateForm,
    } = useForm({
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
        description: "",
        ...initialData
    }, validationRules)

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formState)
            onResetForm();
        } 
        else {
            console.log(errors);
            
        }
    }

    const onCancelForm = () => {
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
                            errorMessage={errors.degree}
                            isInvalid={errors.degree}
                        />

                        <Input
                            variant='solid'
                            label="Institution"
                            name="institution"
                            size="sm"
                            value={institution}
                            onChange={onInputChange}
                            errorMessage={errors.institution}
                            isInvalid={errors.institution}
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
