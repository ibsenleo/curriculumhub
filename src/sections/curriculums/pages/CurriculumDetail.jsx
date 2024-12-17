import { Divider } from '@nextui-org/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoBackButton, TopBarLayout } from '../../../common';
import { selectAuthorById } from '../../../store/author/authorSlice';
import { selectCertificationsByIds, selectEducationsByIds, selectExperiencesByIds, selectExpertiseByIds, selectSkillsByIds } from '../../../store/common';
import { selectResumeeById } from '../../../store/resumee';

export const CurriculumDetail = () => {
  const { id } = useParams();
  const resumee = useSelector(state => selectResumeeById(state,id))
  const author = useSelector(state => selectAuthorById(state, resumee.author))
  const experiences = useSelector(state => selectExperiencesByIds(state, resumee.experiences))
  const expertise = useSelector(state => selectExpertiseByIds(state, resumee.expertise))
  const education = useSelector(state => selectEducationsByIds(state, resumee.educations))
  const skills = useSelector(state => selectSkillsByIds(state, resumee.skills))
  const certifications = useSelector(state => selectCertificationsByIds(state, resumee?.certifications || []))

  
  return (
    <TopBarLayout>
      <div className='text-2xl mb-5 items-center flex gap-2'> <GoBackButton className="mr-2"/> {author.firstName  ?author.firstName + " " +author.lastName : author.username}</div>
      <div>{resumee.bio}</div>
      <div></div>

      <Divider/>
      <div className='text-lg'>Experience</div>
      {experiences.map(experience => (
        <div key={experience.id}>
          {experience.companyName} - {experience.jobTitle}
        </div>
      ))}

    <Divider/>
      <div className='text-lg'>Expertise</div>
      {expertise.map(expertiseItem => (
        <div key={expertiseItem.id}>
          {expertiseItem.name} - {expertiseItem.years}
          <div>{expertiseItem.description}</div>
        </div>
      ))}

    <Divider/>
    <div className='text-lg'>Education</div>
      {education.map(educationItem => (
        <div key={educationItem.id}>
          {educationItem.institution} - {educationItem.degree}
          <div>{educationItem.year}</div>
        </div>
      ))}

    <Divider/>
    <div className='text-lg'>Skills</div>
      {skills.map(skill => (
        <div key={skill.id}>
          {skill.name} - {skill.level}
        </div>
      ))}

    <Divider/>
    <div className='text-lg'>Certifications</div>
      {certifications.map(certification => (
        <div key={certification.id}>
          {certification.name} - {certification.authority}
          <div>{certification.issueDate}</div>
        </div>
      ))}
    </TopBarLayout>
  )
}
