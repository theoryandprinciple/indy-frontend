import { createSelector } from 'reselect';

const getIntakeState = state => state.intake;

export const getAnswers = createSelector(
    getIntakeState,
    intakeState => intakeState.answers,
);

export const getIntakeStepCleared = createSelector(
    getIntakeState,
    intakeState => intakeState.intakeStepCleared,
);
