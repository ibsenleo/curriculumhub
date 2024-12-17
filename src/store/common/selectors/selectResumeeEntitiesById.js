import { createSelector } from '@reduxjs/toolkit';

export const createGenericEntitySelector = (sliceName) => {
  // Selector base para obtener las entidades del slice
  const selectEntities = (state) => state[sliceName].entities;

  // Selector genérico que recibe un array de IDs
  return createSelector(
    [selectEntities, (_, ids) => ids],
    (entities, ids) => {
      if (!ids?.length) return [];
      
      return ids
        .map(id => entities[id])
        .filter(Boolean);
    }
  );
};

export const selectEducationsByIds = createGenericEntitySelector('educations');
export const selectExperiencesByIds = createGenericEntitySelector('experiences');
export const selectExpertiseByIds = createGenericEntitySelector('expertise');
export const selectSkillsByIds = createGenericEntitySelector('skills');
export const selectCertificationsByIds = createGenericEntitySelector('certifications');


