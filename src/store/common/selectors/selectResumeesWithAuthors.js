import { createSelector } from 'reselect';
import { selectAllAuthors } from '../../author/authorSlice';
import { selectAllResumees } from '../../resumee';


export const selectResumeesWithAuthors = createSelector(
  [selectAllResumees, selectAllAuthors],
  (resumees, authors) => {
    return resumees.map(resumee => ({
      ...resumee,
      author: authors.find(author => author.id === resumee.author)
    }));
  }
);
