import { createSelector } from 'reselect';

const getFormState = state => state.form;

export const getAnswers = createSelector(
    getFormState,
    formState => {console.log(formState); return formState.answers},
);
