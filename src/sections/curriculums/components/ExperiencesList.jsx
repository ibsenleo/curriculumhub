import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { Button, Chip, DatePicker, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from '../../../hooks/useForm';
import { useExperiences } from '../hooks/useExperiences';
import { useEffect } from 'react';
import { useState } from 'react';

export const ExperiencesList = ({ onExperienceChange = () => { } }) => {

    const [editId, setEditId] = useState(null)
    const { onInputChange, onResetForm, setValue, jobTitle, companyName, endDate, startDate, jobDescription, setFormData } = useForm({
        jobTitle: "",
        companyName: "",
        startDate: today(getLocalTimeZone()).toString(),
        endDate: null,
        jobDescription: ""
    })

    const { setShowExperienceForm,
        onDeleteExperience,
        onEditExperience,
        onSubmitExperience,
        showExpForm,
        experiences } = useExperiences([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        onSubmitExperience({
            id: editId,
            jobTitle: jobTitle,
            companyName: companyName,
            startDate: startDate,
            endDate: endDate,
            jobDescription: jobDescription
        })
        onResetForm()
        setEditId(null)
    }

    const onAddExperieceButton = ()=> {
        setEditId(null)
        onResetForm()
        setShowExperienceForm(true)
    }

    const onEditExperienceButton = (experience) => {
        setEditId(experience.id)
        setFormData({
            companyName: experience.companyName,
            startDate: experience.startDate,
            endDate: experience.endDate,
            jobDescription: experience.jobDescription,
            jobTitle: experience.jobTitle,
        });
        // setValue("companyName", experience.companyName)
        // setValue("startDate", experience.startDate)
        // setValue("endDate", experience.endDate)
        // setValue("jobDescription", experience.jobDescription)
        // setValue("jobTitle", experience.jobTitle)

        setShowExperienceForm(true)
        
    }

    const onCancelForm = () => {
        onResetForm()
        setEditId(null)
        setShowExperienceForm(false)
    }

    useEffect(() => {
      onExperienceChange(experiences)
    }, [experiences])
    
    return (
        <>
            <div className='grid grid-flow-col items-center mb-5'>
                <div className='text-xl'>Experiencies</div>
                <div className='flex  justify-end'>
                    <Button
                        onClick={onAddExperieceButton}
                        endContent={<PlusIcon  className="size-6 "/>}
                        isIconOnly
                        >
                        </Button>
                </div>
            </div>

            {/* Experience form */}
            {showExpForm && (
                <div className="grid grid-flow-row gap-3 animate-fade animate-duration-150">
                    <div className='dark:border-zinc-700 border-zinc-300 border dark:bg-zinc-900 bg-zinc-100  rounded-lg shadow-lg gap-3 p-3'>
                        <form onSubmit={onSubmitForm}>
                            <div className='grid grid-cols-2 p-3 gap-3 items-center'>
                                <Input
                                    variant='faded'
                                    label="Job Title"
                                    name="jobTitle"
                                    labelPlacement="outside"
                                    value={jobTitle}
                                    onChange={onInputChange}
                                />
                                <Input
                                    variant='faded'
                                    label="Company Name"
                                    name="companyName"
                                    value={companyName}
                                    labelPlacement="outside"
                                    onChange={onInputChange}

                                />
                                
                                <DatePicker
                                    showMonthAndYearPickers
                                    variant='faded'
                                    label="Start Date"
                                    name='startDate'
                                    value={startDate ? parseDate(startDate) : null}
                                    onChange={(date) => onInputChange({ name: 'startDate', value: date.toString() })}
                                // onChange={(date) => onInputChange({ target: { name: 'startDate', value: date } })}
                                />

                                <DatePicker
                                    showMonthAndYearPickers
                                    variant='faded'
                                    label="End Date"
                                    name='endDate'
                                    value={endDate ? parseDate(endDate) : null}
                                    onChange={(date) => onInputChange({ name: 'endDate', value: date.toString() })}

                                />
                                <Textarea
                                    variant='faded'
                                    className='col-span-2'
                                    label="Job Description"
                                    name='jobDescription'
                                    value={jobDescription}
                                    onChange={onInputChange}
                                />
                                <div className='flex justify-end col-span-2 gap-2'>
                                    <Button onClick={onCancelForm} color='danger'>Cancel</Button>
                                    <Button type='submit' color='success'>{editId ? "Save" : "Add New"}</Button>
                                </div>



                            </div>
                        </form>
                    </div>
                </div>)}

            {experiences.length == 0 && (<div className='flex justify-center text-2xl dark:text-zinc-600 text-zinc-400 font-thin m-10'>No experiences yet</div>)}

            {experiences.map((experience, k) => (
                <div className={`${editId == experience.id ? 'dark:bg-zinc-700 bg-zinc-300' : 'dark:bg-zinc-900 bg-zinc-100'} dark:border-zinc-700 border-zinc-300 border  rounded-lg shadow-lg my-3 p-3 text-sm animate-shake animate-duration-500 animate-once`} key={experience.id}>
                    <div className='grid grid-cols-2'>
                        <div>Experience {experience.id}</div>
                        <div className='flex justify-end gap-3'>
                            <Button 
                            onClick={() => onEditExperienceButton(experience)}
                            isIconOnly
                            radius='lg'>
                                <PencilIcon className='size-4'/>
                            </Button>
                            <Button 
                            onClick={() => onDeleteExperience(experience.id)}
                            isIconOnly
                            radius='lg'>
                                <TrashIcon className='size-4' color='danger'/>
                            </Button>
                        </div>
                    </div>
                    <div className='text-xl'><span className='font-bold text-zinc-500'>Job title: </span>{experience.jobTitle} </div>
                    <div className='text-xl'><span className='font-bold text-zinc-500'>Company: </span>{experience.companyName} </div>
                    <div className='my-1'><span className='font-bold text-zinc-500'>Start date: </span><Chip size='sm'>{experience.startDate} </Chip></div>
                    <div className='my-1'><span className='font-bold text-zinc-500'>End date: </span><Chip size='sm'>{experience.endDate || 'current'} </Chip></div>
                    <div><span className='font-bold text-zinc-500'>Job description: </span><div style={{ "whiteSpace": 'pre-wrap' }}>{experience.jobDescription || 'current'}</div></div>
                </div>
            ))}


        </>
    )
}
