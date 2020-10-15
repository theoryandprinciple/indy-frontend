import IntakeTypes from '../action-types/intake';

// eslint-disable-next-line import/prefer-default-export
export const SaveAnswers = answers => ({
    type: IntakeTypes.SAVE_INTAKE,
    payload: answers,
});
