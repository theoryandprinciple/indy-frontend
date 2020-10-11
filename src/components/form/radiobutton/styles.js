import Colors from '../../../styles/colors';

const buttonStyleBase = {
    height: 40,
    borderRadius: 5,
    border: `1px solid ${Colors.persianBlue}`,
    color: Colors.persianBlue,
    padding: '6px 24px',
    margin: '4px 8px 4px 0',
    minWidth: 64,
    boxSizing: 'border-box',
    justifyContent: 'center',
};

const buttonStyleLabelBase = {
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 15,
    lineHeight: '19px',
    color: Colors.persianBlue,
};

const styles = () => ({
    hideRadioIcon: {
        padding: 0,
        opacity: 0,
        width: 0,
        height: 0,
    },
    radioButton: {
        color: Colors.jungleGreen,
    },
    'radioButton-buttonStyle': {
        ...buttonStyleBase,
        '&:hover, &:focus-within:hover': {
            backgroundColor: Colors.white,
            boxShadow: '0 5px 15px 0 rgba(0,0,0,0.2)',
        },
        '&:focus-within': {
            backgroundColor: Colors.white,
            borderWidth: 3,
        },
    },
    radioButtonChecked: {
        color: Colors.ultramarineBlue,
    },
    'radioButtonChecked-buttonStyle': {
        ...buttonStyleBase,
        border: 0,
        backgroundColor: Colors.persianBlue,
        '&:hover, &:focus-within:hover, &:focus': {
            backgroundColor: Colors.ultramarineBlue,
            boxShadow: '0 5px 15px 0 rgba(0,0,0,0.2)',
            border: 0,
        },
        '&:focus-within': {
            backgroundColor: Colors.persianBlue,
            borderColor: Colors.ultramarineBlue,
            borderWidth: 3,
        },
    },
    'radioButtonDisabled-buttonStyle': {
        ...buttonStyleBase,
        backgroundColor: Colors.white,
        border: `1px solid rgba(${Colors.persianBlueRGB}, .3)`,
    },
    'radioButtonLabel-buttonStyle': {
        ...buttonStyleLabelBase,
    },
    'radioButtonLabelChecked-buttonStyle': {
        ...buttonStyleLabelBase,
        color: Colors.white,
    },
    'radioButtonLabelDisabled-buttonStyle': {
        ...buttonStyleLabelBase,
        color: `rgba(${Colors.persianBlueRGB}, .3)`,
    },
});

export default styles;
