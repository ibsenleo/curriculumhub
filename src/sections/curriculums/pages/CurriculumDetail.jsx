import React from 'react'
import { useParams } from 'react-router-dom';
import { GoBackButton, TopBarLayout } from '../../../common';
import { useSelector } from 'react-redux';
import { selectResumeeById } from '../../../store/resumee';
import { selectAuthorById } from '../../../store/author/authorSlice';
import { selectExperiencesByResumeIds } from '../../../store/experience/experienceSelectors';
import { selectExpertiseByResumeIds } from '../../../store/expertise/expertiseSelectors';
import { selectEducationsByResumeIds } from '../../../store/education';

export const CurriculumDetail = () => {
  const { id } = useParams();
  const resumee = useSelector(state => selectResumeeById(state,id))
  const author = useSelector(state => selectAuthorById(state, resumee.author))
  const experiences = useSelector(state => selectExperiencesByResumeIds(state, resumee.experiences))
  const expertise = useSelector(state => selectExpertiseByResumeIds(state, resumee.expertise))
  const education = useSelector(state => selectEducationsByResumeIds(state, resumee.education))
  console.log(resumee.experiences)

  console.log(JSON.stringify(experiences))
  
  return (
    <TopBarLayout>
      <div className='text-2xl mb-5 items-center flex gap-2'> <GoBackButton className="mr-2"/> {author.firstName  ?author.firstName + " " +author.lastName : author.username}</div>
      <div>{resumee.bio}</div>
      <div></div>

      {experiences.map(experience => (
        <div key={experience.id}>
          {experience.companyName} - {experience.jobTitle}
        </div>
      ))}

      {expertise.map(expertiseItem => (
        <div key={expertiseItem.id}>
          {expertiseItem.name} - {expertiseItem.years}
          <div>{expertiseItem.description}</div>
        </div>
      ))}

      {education.map(educationItem => (
        <div key={educationItem.id}>
          {educationItem.institution} - {educationItem.degree}
          <div>{educationItem.year}</div>
        </div>
      ))}
    </TopBarLayout>
  )
}
