import FormTypes from '../action-types/form';
import WebClient from '../utils/web-client';

export const SaveAnswers = answers => ({
    type: FormTypes.SAVE_FORM,
    payload: answers,
});

export const PostFormBegin = () => ({
    type: FormTypes.POST_FORM_BEGIN,
});

export const PostFormSuccess = PDFLink => ({
    type: FormTypes.POST_FORM_SUCCESS,
    payload: PDFLink,
});

export const PostFormError = () => ({
    type: FormTypes.POST_FORM_ERROR,
});

export const PostForm = (answerSet, onSuccess, onError) => (
    async (dispatch) => {
        dispatch(PostFormBegin());

        try {
            const payload = { ...answerSet };
            if (payload.sendMethod) delete payload.sendMethod;

            const response = await WebClient.patch('/declaration', payload);
            dispatch(PostFormSuccess(response.data));
            onSuccess();
        } catch (error) {
            dispatch(PostFormError());
            onError();
        }
    }
);
