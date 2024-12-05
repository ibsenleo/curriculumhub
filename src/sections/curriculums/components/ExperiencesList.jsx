import { PlusIcon } from '@heroicons/react/16/solid';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { Button, Chip, DatePicker, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from '../../../hooks/useForm';
import { useExperiences } from '../hooks/useExperiences';
import { useEffect } from 'react';

const exp = [{
    id: 6,
    jobTitle: "Desarrollador Backend",
    companyName: "Empresa Ejemplo S.A.",
    startDate: "2021-01-01",
    endDate: "2024-01-01",
    jobDescription: "En mi rol como Ingeniero de Software Senior en Tech Solutions Corp, fui responsable de liderar un equipo de desarrolladores enfocado en la construcción de aplicaciones web escalables utilizando tecnologías como React, Node.js, y AWS. Durante mi tiempo en la empresa, trabajé estrechamente con diseñadores y gestores de producto para definir y cumplir con los requisitos del cliente, garantizando una experiencia de usuario óptima y una arquitectura robusta. Implementé prácticas de desarrollo ágil, incluyendo integración continua y despliegue continuo (CI/CD), lo cual mejoró significativamente la eficiencia del equipo. Además, fui mentor de desarrolladores junior, ayudándoles a mejorar sus habilidades técnicas y fomentando una cultura de colaboración y mejora continua dentro del equipo. Entre mis logros más destacados se incluye la reestructuración de la aplicación principal, que resultó en una reducción del tiempo de carga en un 40% y una mejora notable en la satisfacción del cliente."
}]
export const ExperiencesList = ({ onExperienceChange = () => { } }) => {


    const { onInputChange, onResetForm, jobTitle, companyName, endDate, startDate, jobDescription } = useForm({
        jobTitle: "",
        companyName: "",
        startDate: today(getLocalTimeZone()).toString(),
        endDate: null,
        jobDescription: ""
    })

    const { onAddExperience,
        onDeleteExperience,
        onSubmitExperience,
        showExpForm,
        experiences } = useExperiences(exp);

    const onSubmitForm = (e) => {
        e.preventDefault();
        onSubmitExperience({
            jobTitle: jobTitle,
            companyName: companyName,
            startDate: startDate,
            endDate: endDate,
            jobDescription: jobDescription
        })
        onResetForm()
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
                        onClick={() => onAddExperience(true)}
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
                                    <Button onClick={() => onAddExperience(false)} color='danger'>Cancel</Button>
                                    <Button type='submit'>Add</Button>
                                </div>



                            </div>
                        </form>
                    </div>
                </div>)}

            {experiences.length == 0 && (<div className='flex justify-center text-2xl dark:text-zinc-600 text-zinc-400 font-thin m-10'>No experiences yet</div>)}

            {experiences.map((experience, k) => (
                <div className='dark:border-zinc-700 border-zinc-300 border dark:bg-zinc-900 bg-zinc-100 rounded-lg shadow-lg my-3 p-3 text-sm animate-fade' key={experience.id}>
                    <div className='grid grid-cols-2'>
                        <div>Experience {experience.id}</div>
                        <div className='flex justify-end'><Button onClick={() => onDeleteExperience(experience.id)}>Delete</Button></div>
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
