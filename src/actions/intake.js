import IntakeTypes from '../action-types/intake';
import WebClient from '../utils/web-client';

export const SaveAnswers = answers => ({
    type: IntakeTypes.SAVE_INTAKE,
    payload: answers,
});

export const PostAnswers = (reportId, patchData, onSuccess, onError) => (
    async (dispatch) => {
        // dispatch(patchReportBegin(reportId));

        try {
            const payload = {
                ...patchData,
            };
            await WebClient.patch(`/reports/${reportId}`, payload);
            // dispatch(patchReportSuccess(reportId, patchData));

            onSuccess();
        } catch (error) {
            // dispatch(patchReportError(reportId, error));

            onError();
        }
    }
);
