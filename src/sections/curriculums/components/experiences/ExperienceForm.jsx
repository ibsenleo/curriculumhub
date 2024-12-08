import { Button, DatePicker, Input, Textarea } from '@nextui-org/react'
import React from 'react'
import { useForm } from '../../../../hooks/useForm'
import { parseDate } from '@internationalized/date'

export const ExperienceForm = ({ onSubmit, onCancel = () => { }, initialData = {} }) => {

    const { onInputChange,
        onResetForm,
        formState,
        isFormEmpty,
        jobTitle,
        companyName,
        endDate,
        startDate,
        jobDescription,
    } = useForm({
        jobTitle: "",
        companyName: "",
        startDate: null,
        endDate: null,
        jobDescription: "",
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
                            label="Job Title"
                            name="jobTitle"
                            labelPlacement="outside"
                            value={jobTitle}
                            onChange={onInputChange}
                        />
                        <Input
                            variant='solid'
                            label="Company Name"
                            name="companyName"
                            value={companyName}
                            labelPlacement="outside"
                            onChange={onInputChange}

                        />

                        <DatePicker
                            showMonthAndYearPickers
                            variant='solid'
                            label="Start Date"
                            name='startDate'
                            value={startDate ? parseDate(startDate) : null}
                            onChange={(date) => onInputChange({ name: 'startDate', value: date.toString() })}
                        // onChange={(date) => onInputChange({ target: { name: 'startDate', value: date } })}
                        />

                        <DatePicker
                            showMonthAndYearPickers
                            variant='solid'
                            label="End Date"
                            name='endDate'
                            value={endDate ? parseDate(endDate) : null}
                            onChange={(date) => onInputChange({ name: 'endDate', value: date.toString() })}

                        />
                        <Textarea
                            variant='solid'
                            className='col-span-2'
                            label="Job Description"
                            name='jobDescription'
                            value={jobDescription}
                            onChange={onInputChange}
                        />
                        <div className='flex justify-end col-span-2 gap-2'>
                            <Button onClick={onCancelForm}  variant="flat" color='danger'>Cancel</Button>
                            <Button type='submit' color='success'>{initialData?.id ? "Save" : "Add New"}</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
