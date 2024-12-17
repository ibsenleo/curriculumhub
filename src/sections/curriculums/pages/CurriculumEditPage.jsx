import React from 'react'
import { GoBackButton, TopBarLayout } from '../../../common'
import { useParams } from 'react-router-dom';
import { selectResumeesWithEntitiesById } from '../../../store/common/selectors/selectResumeeWithEntitiesById';
import { useSelector } from 'react-redux';
import { selectAllExpertises } from '../../../store/expertise';
import { selectAllEducations } from '../../../store/education';
import { selectAllSkills } from '../../../store/skill';

export const CurriculumEditPage = () => {
    const { id } = useParams();

    const resumeeWithEntitiesById = useSelector(state => selectResumeesWithEntitiesById(state, id));
    
    return (
        <TopBarLayout>
            <div className='text-2xl mb-5 items-center flex gap-2'> <GoBackButton className="mr-2" /> Curriculum Edit {id}</div>
        </TopBarLayout>
    )
}
