import IntakeTypes from '../action-types/intake';

// eslint-disable-next-line import/prefer-default-export
export const SaveAnswers = answers => ({
    type: IntakeTypes.SAVE_INTAKE,
    payload: answers,
});

// eslint-disable-next-line import/prefer-default-export
export const UpdateIntakeStep = step => ({
    type: IntakeTypes.UPDATE_INTAKE_STEP,
    payload: step,
});
