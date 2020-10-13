import FormTypes from '../action-types/form';
import WebClient from '../utils/web-client';

export const SaveAnswers = answers => ({
    type: FormTypes.SAVE_FORM,
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
