import { createSelector } from '@reduxjs/toolkit';

const selectEntities = (state) => state.educations.entities;

export const selectEducationsByResumeIds = createSelector(
    [selectEntities, (_, ids) => ids],
    (entities, ids) => {
      if (!ids || ids.length === 0) return [];
      
      return ids.reduce((allEducations, id) => {
        const education = entities[id];
        if (education && education.id) {
          return [...allEducations, education];
        }
        return allEducations;
      }, []);
    }
  );
