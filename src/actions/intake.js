import IntakeTypes from '../action-types/intake';

export const SaveAnswers = answers => ({
    type: IntakeTypes.SAVE_INTAKE,
    payload: answers,
});

export const UpdateIntakeStep = step => ({
    type: IntakeTypes.UPDATE_INTAKE_STEP,
    payload: step,
});

export const ResetIntake = () => ({
    type: IntakeTypes.RESET_INTAKE,
});
