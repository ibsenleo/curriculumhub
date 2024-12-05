import React from 'react'
import { GoBackButton, TopBarLayout } from '../../../common'
import { Avatar, Button, DatePicker, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useSelector } from 'react-redux'
import { PlusIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { ExperiencesList } from '../components/ExperiencesList'

const offices = [
    {id:1, name:'Spain/Barcelona', flag: 'es'},
    {id:2, name:'Spain/Madrid', flag:'es'},
    {id:3, name:'Spain/Salamanca', flag:'es'},
    {id:4, name:'Andorra', flag:'ad'},
    {id:5, name:'United Kingdom', flag:'gb'},
    {id:6, name:'Switzerland', flag:'ch'},
    {id:7, name:'Other'},
];

export const CurriculumNewPage = () => {
    const auth = useSelector((state) => state.auth);

    return (

        <TopBarLayout className='max-w-4xl m-auto items-stretch w-full'>
            
            <div className='text-2xl mb-5 items-center flex gap-2'> <GoBackButton/> Add New Curriculum</div>
            <div className='text-xl mb-2'>Personal Info</div>
            <div className='dark:border-zinc-700 border-zinc-300 border dark:bg-zinc-900 bg-zinc-100   rounded-lg shadow-lg gap-3 p-3 mb-5'>
                <div className='grid md:grid-cols-2 grid-cols-1 p-3 gap-3 items-center justify-items-center'>
                    <Input
                        variant='faded'
                        label="Version"
                        name="version"
                        labelPlacement="outside"
                        value={auth.username}
                    />
                    <Input
                        variant='faded'
                        label="Email"
                        name="email"
                        labelPlacement="outside"
                        isReadOnly
                        className='text-zinc-400'
                        value={auth.email}
                    />
                    <Input
                        variant='faded'
                        label="First name"
                        name="firstname"
                        labelPlacement="outside"
                        className='text-zinc-400'
                        isReadOnly
                        value={auth.firstName}
                    />
                    <Input
                        variant='faded'
                        label="Last name"
                        name="lastname"
                        labelPlacement="outside"
                        className='text-zinc-400'
                        isReadOnly
                        value={auth.lastName}
                    />

                    <Input
                        variant='faded'
                        label="Avaloq Experience"
                        name="avaloqExperienceTime"
                        labelPlacement="outside"
                        endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">Years</span>
                            </div>
                        }
                    />

                    <Input
                        variant='faded'
                        label="Professional Level"
                        name="professionalLevel"
                        labelPlacement="outside"
                        
                    />

                    <Select
                    labelPlacement="outside"
                    label="Office"
                    className=""
                    variant='faded'
                    >
                    {offices.map((office,k) => (
                        <SelectItem 
                        key={office.id}
                        startContent={<Avatar alt={office.flag+k} className="w-6 h-6" src={`https://flagcdn.com/${office.flag}.svg`}/>}
                        >
                            
                        {office.name}
                        </SelectItem>
                    ))}
                    </Select>
                    

                </div>
            </div>

            
            <hr className='my-2'/>
           <ExperiencesList onExperienceChange={exp => console.log(JSON.stringify(exp))}/>
            <div className='flex justify-end'>
                <Button className='' color='success'>Save Curriculum</Button>
            </div>

        </TopBarLayout>
    )
}
