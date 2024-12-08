import { Avatar, Button, Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { GoBackButton, TopBarLayout } from '../../../common'
import { CertificationForm, CertificationItem } from '../components/certifications'
import { CurriculumItemsList } from '../components/CurriculumItemsList'
import { CurriculumProvider } from '../context/CurriculumContext'
import { SkillForm, SkillItem } from '../components/skills'
import { ExperienceForm, ExperienceItem } from '../components/experiences'
import { ExpertiseForm, ExpertiseItem } from '../components/expertise'

const offices = [
    { id: 1, name: 'Spain/Barcelona', flag: 'es' },
    { id: 2, name: 'Spain/Madrid', flag: 'es' },
    { id: 3, name: 'Spain/Salamanca', flag: 'es' },
    { id: 4, name: 'Andorra', flag: 'ad' },
    { id: 5, name: 'United Kingdom', flag: 'gb' },
    { id: 6, name: 'Switzerland', flag: 'ch' },
    { id: 7, name: 'Other' },
];

export const CurriculumNewPage = () => {
    const auth = useSelector((state) => state.auth);

    //TODO: Envolver todo en el provider y enviar toda la info al save curric 

    return (

        <TopBarLayout className='max-w-4xl m-auto items-stretch w-full'>

            <div className='text-2xl mb-5 items-center flex gap-2'> <GoBackButton /> Add New Curriculum</div>
            <div className='text-xl mb-2'>Personal Info</div>
            <div className='dark:border-zinc-700 border-zinc-300 border dark:bg-zinc-900 bg-zinc-100   rounded-lg shadow-lg gap-3 p-3 mb-5'>
                <div className='grid md:grid-cols-2 grid-cols-1 p-3 gap-3 items-center justify-items-center'>
                    <Input
                        variant='solid'
                        label="Version"
                        name="version"
                        labelPlacement="outside"
                        value={auth.username}
                    />
                    <Input
                        variant='solid'
                        label="Email"
                        name="email"
                        labelPlacement="outside"
                        isReadOnly
                        className='text-zinc-400'
                        value={auth.email}
                    />
                    <Input
                        variant='solid'
                        label="First name"
                        name="firstname"
                        labelPlacement="outside"
                        value={auth.firstName || ""}
                    />
                    <Input
                        variant='solid'
                        label="Last name"
                        name="lastname"
                        labelPlacement="outside"
                        value={auth.lastName || ""}
                    />
                    {/* 
                    <Input
                        variant='solid'
                        label="Avaloq Experience"
                        name="avaloqExperienceTime"
                        labelPlacement="outside"
                        endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">Years</span>
                            </div>
                        }
                    /> */}

                    <Input
                        variant='solid'
                        label="Professional Level"
                        name="professionalLevel"
                        labelPlacement="outside"

                    />

                    <Select
                        labelPlacement="outside"
                        label="Office"
                        className=""
                        variant='solid'
                    >
                        {offices.map((office, k) => (
                            <SelectItem
                                key={office.id}
                                startContent={<Avatar alt={office.flag + " " + k}
                                    className="w-6 h-6"
                                    src={`https://flagcdn.com/${office.flag}.svg`} />}
                            >

                                {office.name}
                            </SelectItem>
                        ))}
                    </Select>


                </div>
            </div>



            <CurriculumProvider>

                <CurriculumItemsList
                    listName="experiences"
                    //Each item card structure. Better to have it outside component
                    renderItem={(item, onEdit, onDelete) => (
                        <ExperienceItem key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
                    )}
                >
                    <ExperienceForm />
                </CurriculumItemsList>

                <CurriculumItemsList
                    listName="certifications"
                    //Each item card structure. Better to have it outside component
                    renderItem={(item, onEdit, onDelete) => (
                        <CertificationItem key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
                    )}
                >
                    <CertificationForm />
                </CurriculumItemsList>

                <CurriculumItemsList
                    listName="skills"
                    //Each item card structure. Better to have it outside component
                    renderItem={(item, onEdit, onDelete) => (
                        <SkillItem key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
                    )}
                >
                    <SkillForm />
                </CurriculumItemsList>

                <CurriculumItemsList
                    listName="expertise"
                    //Each item card structure. Better to have it outside component
                    renderItem={(item, onEdit, onDelete) => (
                        <ExpertiseItem key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
                    )}
                >
                    <ExpertiseForm />
                </CurriculumItemsList>

            </CurriculumProvider>






            <div className='flex justify-end'>
                <Button className='' color='primary'>Save Curriculum</Button>
            </div>

        </TopBarLayout>
    )
}
