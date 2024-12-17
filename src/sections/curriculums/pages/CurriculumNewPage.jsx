import { Avatar, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { GoBackButton, TopBarLayout } from '../../../common'
import { CertificationForm, CertificationItem } from '../components/certifications'
import { CurriculumItemsList } from '../components/CurriculumItemsList'
import { ExperienceForm, ExperienceItem } from '../components/experiences'
import { ExpertiseForm, ExpertiseItem } from '../components/expertise'
import { SaveCurriculumButton } from '../components/SaveCurriculumButton'
import { SkillForm, SkillItem } from '../components/skills'
import { CurriculumProvider, useCurriculum } from '../context/CurriculumContext'
import { useForm } from '../../../hooks'
import { selectAllOffices } from '../../../store/staticData/staticDataSlice'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { EducationForm, EducationItem } from '../components/educations'

// const offices = [
//     { id: 1, name: 'Spain/Barcelona', flag: 'es' },
//     { id: 2, name: 'Spain/Madrid', flag: 'es' },
//     { id: 3, name: 'Spain/Salamanca', flag: 'es' },
//     { id: 4, name: 'Andorra', flag: 'ad' },
//     { id: 5, name: 'United Kingdom', flag: 'gb' },
//     { id: 6, name: 'Switzerland', flag: 'ch' },
//     { id: 7, name: 'Other' },
// ];


export const CurriculumNewPage = () => {
    const auth = useSelector((state) => state.auth);
    const offices = useSelector(selectAllOffices);


    const initialValue = {
        version: auth.username,
        email: auth.email,
        firstName: auth.firstName,
        lastName: auth.lastName,
        professionalLevel: "",
        office: "2",
        bio: ""
    }

    const {
        formState,
        onInputChange,
        onResetForm,
        version,
        email,
        firstName,
        lastName,
        professionalLevel,
        office,
        bio
    } = useForm(initialValue)


    const getOfficeById = useCallback((id) => {
        return offices.find((office) => office.id == id)
    }, [office])

    const onSubmitForm = () => {
        onResetForm()
    }

    return (
        <TopBarLayout className='max-w-4xl m-auto items-stretch w-full'>
            <CurriculumProvider>
                <div className='text-2xl mb-5 items-center flex gap-2'> <GoBackButton /> Add New Curriculum</div>
                <div className='text-xl mb-2'>Personal Info</div>
                <div className=' dark:bg-zinc-900 bg-zinc-100   rounded-lg shadow-lg gap-3 p-3 mb-5'>
                    <div className='grid md:grid-cols-2 grid-cols-1 p-3 gap-3 items-center justify-items-center'>
                        <Input
                            variant='solid'
                            label="Version"
                            name="version"
                            labelPlacement="outside"
                            value={version}
                            onChange={onInputChange}
                        />
                        <Input
                            variant='solid'
                            label="Email"
                            name="email"
                            labelPlacement="outside"
                            isReadOnly
                            className='text-zinc-400'
                            value={email}
                            onChange={onInputChange}
                        />
                        <Input
                            variant='solid'
                            label="First name"
                            name="firstName"
                            labelPlacement="outside"
                            value={firstName}
                            onChange={onInputChange}
                        />
                        <Input
                            variant='solid'
                            label="Last name"
                            labelPlacement="outside"
                            name="lastName"
                            value={lastName}
                            onChange={onInputChange}
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
                            value={professionalLevel}
                            onChange={onInputChange}
                        />

                        <Select
                            labelPlacement="outside"
                            label="Office"
                            className=""
                            variant='solid'
                            selectedKeys={office.id}
                            onChange={onInputChange}
                            startContent={<Avatar alt={getOfficeById(office)?.name || ""}
                                className="w-6 h-5"
                                src={`https://flagcdn.com/${getOfficeById(office)?.country || ""}.svg`} />}
                            name="office"
                            scrollShadowProps={{
                                isEnabled: false,
                            }}
                        >
                            {offices.map((office, k) => (
                                <SelectItem
                                    key={office.id}
                                    startContent={<Avatar alt={office.country + " " + k}
                                        className="w-6 h-6"
                                        src={`https://flagcdn.com/${office.country}.svg`} />}
                                >

                                    {office.name}
                                </SelectItem>
                            ))}
                        </Select>

                        <Textarea
                            variant='solid'
                            className='col-span-2'
                            label="Bio"
                            name='bio'
                            value={bio}
                            onChange={onInputChange}
                        />


                    </div>
                </div>


                <CurriculumItemsList
                    listName="educations"
                    //Each item card structure. Better to have it outside component
                    renderItem={(item, onEdit, onDelete) => (
                        <EducationItem key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
                    )}
                >
                    <EducationForm />
                </CurriculumItemsList>

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









                {/* <div className='flex justify-end'>
                <Button className='' color='primary'>Save Curriculum</Button>
            </div> */}
                <SaveCurriculumButton formdata={formState} onSubmitForm={onSubmitForm} />

            </CurriculumProvider>
        </TopBarLayout>
    )
}
