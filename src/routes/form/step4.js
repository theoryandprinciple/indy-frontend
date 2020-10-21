import React, {
    useState,
    useRef,
    useLayoutEffect,
    useEffect,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSignaturePad from 'react-hook-signature';

import { getPdfLink, getFormStepCleared } from '../../selectors/form';
import { SaveAnswers, UpdateFormStep } from '../../actions/form';
import CombineStyles from '../../utils/combine-styles';
import LayoutStyles from '../../styles/layouts';
import ButtonStyles from '../../styles/buttons';
import Styles from './styles';

const FormStep4 = ({ classes }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const pdfLink = useSelector(getPdfLink);
    const formStepCleared = useSelector(getFormStepCleared);

    const containerNode = useRef(null);
    const [canvasContainerWidth, setCanvasContainerWidth] = useState(null);
    const [continueActive, setContinueActive] = useState(false);

    // measure the width of the canvas container on init and resize
    useLayoutEffect(() => {
        const measure = () => {
            window.requestAnimationFrame(() => {
                if (containerNode.current) {
                    const { width } = containerNode.current.getBoundingClientRect();
                    setCanvasContainerWidth(width);
                }
            });
        };
        measure();

        window.addEventListener('resize', measure);

        return () => {
            window.removeEventListener('resize', measure);
        };
    }, [containerNode]);

    const {
        handleClear,
        handleSave,
        updateOptions,
        canvasProps,
    } = useSignaturePad({
        height: 150,
        width: canvasContainerWidth,
    });

    // keep the width of the canvas updated to fill its responsive container
    useEffect(() => {
        updateOptions({
            height: 150,
            width: canvasContainerWidth,
        });
    }, [canvasContainerWidth, updateOptions]);

    /*
    const onSignatureEnd = (event) => {
        event.preventDefault();
        setContinueActive(true);
    };
    */
    const onCancelClick = useCallback(() => {
        handleClear();
        setContinueActive(false);
    }, [handleClear, setContinueActive]);
    const onSaveClick = useCallback(() => {
        const signatureImage = handleSave('image/png', 1); // Saves as PNG at 100% original quality
        dispatch(UpdateFormStep(4));
        dispatch(SaveAnswers({ signature: signatureImage }));
        history.push('/form/5');
    }, [handleSave, history, dispatch]);

    useEffect(() => {
        if (formStepCleared < 3) history.push(`/form/${formStepCleared}`);
    }, [formStepCleared, history]);

    useEffect(() => {
        document.getElementById('signaturePad').focus();
    }, []); // eslint-disable-line

    return (
        <div className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Please sign the form</Typography>
                            <Typography variant="body1" className="mt-3" id="signatureTitle">
                                Use your mouse (or finger on a phone) to sign the form digitally
                            </Typography>
                            <div ref={containerNode} className={classes.canvasContainer}>
                                <canvas
                                    {...canvasProps}
                                    style={{ minHeight: 150 }}
                                    // onPointerUp={onSignatureEnd}
                                    // onPointerOut={onSignatureEnd}
                                    tabIndex={0}
                                    aria-describedby="signatureTitle"
                                    id="signaturePad"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-4 mr-md-0 text-right">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => onCancelClick()}
                            >
                                Clear
                            </Button>
                        </div>
                        <div className="col-md-8 mt-3 mt-md-0 text-right">
                            <Typography variant="body1">
                                Having Trouble Signing?
                                &nbsp;<a href={pdfLink} target="_blank" rel="noopener noreferrer" className={classes.textLink}>Download form</a>
                            </Typography>
                        </div>
                    </div>
                    <div className="row no-gutters mt-3 mt-sm-5 mb-3">
                        <div className="col d-none d-sm-flex" />
                        <div className="col-12 col-sm-auto text-right mt-3 mt-sm-0 mr-0 mr-sm-3 order-12 order-sm-1">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.push('/form/3')}
                            >
                                Previous
                            </Button>
                        </div>
                        <div className="col-12 col-sm-auto text-right order-1 order-sm-12">
                            <Button
                                variant="contained"
                                color="primary"
                                // disabled={!continueActive}
                                onClick={() => onSaveClick()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

FormStep4.propTypes = {
    classes: PropTypes.object.isRequired,
};

const combinedStyles = CombineStyles(LayoutStyles, ButtonStyles, Styles);
export default withStyles(combinedStyles)(FormStep4);
