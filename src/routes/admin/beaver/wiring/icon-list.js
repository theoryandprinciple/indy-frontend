import React from 'react';
import RadioIcon from '@material-ui/icons/RadioButtonChecked';
import CheckBoxIcon from '@material-ui/icons/Check';
import ShortTextIcon from '@material-ui/icons/ShortText';
import LongTextIcon from '@material-ui/icons/FormatAlignLeft';
import NumberIcon from '@material-ui/icons/Cake';

import DateIcon from '@material-ui/icons/DateRange';
import FileUploaderIcon from '@material-ui/icons/CloudUpload';
import JurisdictionIcon from '@material-ui/icons/Room';
import LegalDisclaimerIcon from '@material-ui/icons/CheckBoxOutlined';

import EmailIcon from '@material-ui/icons/Email';

import QuestionTypes from '../flow-builder/wiring/question-types';
import OutputTypes from '../flow-builder/wiring/output-types';

export default {
    [QuestionTypes.RADIO]: <RadioIcon />,
    [QuestionTypes.CHECKBOX]: <CheckBoxIcon />,
    [QuestionTypes.SHORT_TEXT]: <ShortTextIcon />,
    [QuestionTypes.LONG_TEXT]: <LongTextIcon />,
    [QuestionTypes.NUMBER]: <NumberIcon />,
    [QuestionTypes.DATE]: <DateIcon />,
    [QuestionTypes.FILE_UPLOAD]: <FileUploaderIcon />,
    [QuestionTypes.JURISDICTION]: <JurisdictionIcon />,
    [QuestionTypes.LEGAL_DISCLAIMER]: <LegalDisclaimerIcon />,
    [OutputTypes.EMAIL]: <EmailIcon />,
    [OutputTypes.CONTENT]: <LongTextIcon />,
};