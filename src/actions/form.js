import { cloneDeep } from 'lodash';
import { getAnswers } from '../selectors/intake';

import FormTypes from '../action-types/form';
import WebClient from '../utils/web-client';

export const SoftResetForm = () => ({
    type: FormTypes.SOFT_RESET_FORM,
});

export const HardResetForm = () => ({
    type: FormTypes.HARD_RESET_FORM,
});

export const SaveAnswers = answers => ({
    type: FormTypes.SAVE_FORM,
    payload: answers,
});

export const PostFormBegin = () => ({
    type: FormTypes.POST_FORM_BEGIN,
});

export const PostFormSuccess = pdfLink => ({
    type: FormTypes.POST_FORM_SUCCESS,
    payload: pdfLink,
});

export const PostFormError = () => ({
    type: FormTypes.POST_FORM_ERROR,
});

export const PostForm = (answerSet, onSuccess, onError, finalStep = false) => (
    async (dispatch, getState) => {
        const intakeAnswers = getAnswers(getState());
        dispatch(PostFormBegin());

        try {
            // shallow clone, as produced by spread operator, is insufficant
            const payload = cloneDeep(answerSet);
            payload.answers = intakeAnswers;
            // dont send the sendMethod
            delete payload.sendMethod;

            // remove parameters if they dont have values
            if (!payload.signature) delete payload.signature;

            if (!payload.tenant.address2) delete payload.tenant.address2;
            if (!payload.tenant.race) delete payload.tenant.race;
            if (!payload.tenant.gender) delete payload.tenant.gender;

            if (!payload.landlord.address) {
                delete payload.landlord.address;
                delete payload.landlord.address2;
                delete payload.landlord.city;
                delete payload.landlord.state;
                delete payload.landlord.zip;
            } else if (!payload.landlord.address2) delete payload.landlord.address2;

            if (!payload.landlord.email) delete payload.landlord.email;
            if (!payload.landlord.company) delete payload.landlord.company;

            const response = await WebClient.post('/declaration', payload);
            dispatch(PostFormSuccess(response.data.data));
            if (onSuccess) onSuccess();
            if (finalStep) dispatch(SoftResetForm()); // clear everything but pdfLink
        } catch (error) {
            dispatch(PostFormError());
            if (onError) onError();
        }
    }
);

// eslint-disable-next-line import/prefer-default-export
export const UpdateFormStep = step => ({
    type: FormTypes.UPDATE_FORM_STEP,
    payload: step,
});
