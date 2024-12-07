import { Button, DatePicker, Input } from '@nextui-org/react'
import React from 'react'
import { useForm } from '../../../hooks/useForm'
import { parseDate } from '@internationalized/date'

export const CertificationForm = ({ onSubmit, onCancel = () => {}, initialData = {} }) => {

    const {
        formState,
        onInputChange,
        onResetForm,
        setValue,
        setFormData,
        certificationName,
        authority,
        expirationDate,
        issueDate,
    } = useForm({
        certificationName: "",
        authority: "",
        issueDate: null,
        expirationDate: null,
        ...initialData
    })

    const onSubmitForm = (e) => {
        e.preventDefault();
        onSubmit(formState)
        onResetForm();
    }

    const onCancelForm = () => {
        onCancel()
        onResetForm();
    }


    return (
        <div className="grid grid-flow-row gap-3 animate-fade animate-duration-150">
            <div className='dark:border-zinc-700 border-zinc-300 border dark:bg-zinc-900 bg-zinc-100  rounded-lg shadow-lg gap-3 p-3'>
                <form onSubmit={onSubmitForm}>
                    <div className='grid grid-cols-2 p-3 gap-3 items-center'>
                        <Input
                            variant='faded'
                            label="Certification Name"
                            name="certificationName"
                            labelPlacement="outside"
                            value={certificationName}
                            onChange={onInputChange}
                        />
                        <Input
                            variant='faded'
                            label="Authority"
                            name="authority"
                            value={authority}
                            labelPlacement="outside"
                            onChange={onInputChange}

                        />

                        <DatePicker
                            showMonthAndYearPickers
                            variant='faded'
                            label="Issue Date"
                            name='issueDate'
                            value={issueDate ? parseDate(issueDate) : null}
                            onChange={(date) => onInputChange({ name: 'issueDate', value: date.toString() })}
                        // onChange={(date) => onInputChange({ target: { name: 'issueDate', value: date } })}
                        />

                        <DatePicker
                            showMonthAndYearPickers
                            variant='faded'
                            label="Expiration Date"
                            name='expirationDate'
                            value={expirationDate ? parseDate(expirationDate) : null}
                            onChange={(date) => onInputChange({ name: 'expirationDate', value: date.toString() })}

                        />

                        <div className='flex justify-end col-span-2 gap-2'>
                            <Button onClick={onCancelForm} color='danger'>Cancel</Button>
                            <Button type='submit' color='success'>{initialData?.id ? "Save" : "Add New"}</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}