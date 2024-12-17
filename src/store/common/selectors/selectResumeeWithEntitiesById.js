import { createSelector } from 'reselect';
import { selectAllAuthors } from '../../author/authorSlice';
import { selectAllCertifications } from '../../certification';
import { selectAllEducations } from '../../education';
import { selectAllExperiences } from '../../experience';
import { selectAllExpertises } from '../../expertise';
import { selectResumeeById } from '../../resumee';
import { selectAllSkills } from '../../skill';


export const selectResumeesWithEntitiesById = createSelector(
    [
        (state, resumeeId) => selectResumeeById(state, resumeeId),
        selectAllAuthors,
        selectAllExperiences,
        selectAllCertifications,
        selectAllEducations,
        selectAllSkills,
        selectAllExpertises,
    ],
    (
        resumee, 
        authors, 
        experiences, 
        certifications, 
        educations, 
        skills,
        expertise,
    ) => {

        if (!resumee) return null

        
        // // Enrich resumee with information from store
        return {
            ...resumee,
            author: authors.find(author => author.id === resumee.author),
            experiences: experiences.filter(experience =>
                resumee.experiences.includes(experience.id)
            ),
            certifications: resumee.certifications.length > 0 
            ? certifications.filter(certification =>
                resumee.certifications.includes(certification.id)
            ) : [],
            educations: resumee.educations.length > 0 
            ? educations.filter(education =>
                resumee.educations.includes(education.id)
            ) : [],
            skills: resumee.skills.length > 0 
            ? skills.filter(skill =>
                resumee.skills.includes(skill.id)
            ) : [],
            expertise: resumee.expertise.length > 0
            ? expertise.filter(expertise =>
                resumee.expertise.includes(expertise.id)
            ) : [],
        };

    }
);
