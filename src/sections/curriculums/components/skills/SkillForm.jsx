import { Button, DatePicker, Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { useForm } from '../../../../hooks/useForm'
import { parseDate } from '@internationalized/date'
import { AcademicCapIcon, BookOpenIcon, ClipboardDocumentCheckIcon, LightBulbIcon, SparklesIcon, StarIcon } from '@heroicons/react/16/solid';

import { skillLevels } from '../../../../utils/const';

export const SkillForm = ({ onSubmit, onCancel = () => {}, initialData = {} }) => {

    const {
        formState,
        onInputChange,
        onResetForm,
        isFormEmpty,
        skillName,
        skillLevel,
    } = useForm({
        skillName: "",
        skillLevel: "0",
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
            <div className='dark:border-zinc-700 border-zinc-300 border dark:bg-zinc-900 bg-zinc-100  rounded-lg shadow-lg gap-3 p-3'>
                <form onSubmit={onSubmitForm}>
                    <div className='grid grid-cols-2 p-3 gap-3 items-center'>
                        <Input
                            variant='solid'
                            label="Skill Name"
                            name="skillName"
                            size="sm"
                            value={skillName}
                            onChange={onInputChange}
                        />

                        <Select 
                        className="" 
                        size='sm' 
                        label="Select a level"
                        name="skillLevel"
                        selectedKeys={skillLevel}
                        onChange={onInputChange}
  
                        >
                            {skillLevels.map((skl) => (
                            <SelectItem 
                            key={skl.key}
                            startContent={skl.icon}
                            >
                                {skl.label}
                            </SelectItem>
                            ))}
                        </Select>

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
