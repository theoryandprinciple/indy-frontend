import { createSelector } from 'reselect';

const getFormState = state => state.form;

export const getAnswers = createSelector(
    getFormState,
    formState => formState.answers,
);

export const getPdfLink = createSelector(
    getFormState,
    formState => formState.pdfLink,
);
