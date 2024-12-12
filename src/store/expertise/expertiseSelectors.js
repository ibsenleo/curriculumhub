import { createSelector } from '@reduxjs/toolkit';

const selectEntities = (state) => state.expertise.entities;

export const selectExpertiseByResumeIds = createSelector(
    [selectEntities, (_, ids) => ids],
    (entities, ids) => {
      if (!ids || ids.length === 0) return [];
      
      return ids.reduce((allExpertise, id) => {
        const expertise = entities[id];
        if (expertise && expertise.id) {
          return [...allExpertise, expertise];
        }
        return allExpertise;
      }, []);
    }
  );
