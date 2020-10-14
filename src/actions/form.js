import { cloneDeep } from 'lodash';

import FormTypes from '../action-types/form';
import WebClient from '../utils/web-client';

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

export const PostForm = (answerSet, onSuccess, onError) => (
    async (dispatch) => {
        dispatch(PostFormBegin());

        try {
            // shallow clone, as produced by spread operator, is insufficant
            const payload = cloneDeep(answerSet);

            // dont send the sendMethod
            if (payload.sendMethod) delete payload.sendMethod;

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

            if (!payload.landlord.email) delete payload.email;
            if (!payload.landlord.company) delete payload.company;

            const response = await WebClient.patch('/declaration', payload);
            dispatch(PostFormSuccess(response.data));
            if (onSuccess) onSuccess();
        } catch (error) {
            dispatch(PostFormError());
            if (onError) onError();
        }
    }
);
