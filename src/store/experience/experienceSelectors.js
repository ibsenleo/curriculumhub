import { createSelector } from '@reduxjs/toolkit';

const selectEntities = (state) => state.experiences.entities;

export const selectExperiencesByResumeIds = createSelector(
    [selectEntities, (_, ids) => ids],
    (entities, ids) => {
      if (!ids || ids.length === 0) return [];
      
      return ids.reduce((allExperiences, id) => {
        const experience = entities[id];
        if (experience && experience.id) {
          return [...allExperiences, experience];
        }
        return allExperiences;
      }, []);
    }
  );


  // export const selectExperiencesByIds = createGenericEntitySelector('experiences');
