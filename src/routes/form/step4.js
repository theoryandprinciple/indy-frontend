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
import { useDispatch } from 'react-redux';
import useSignaturePad from 'react-hook-signature';

import { SaveAnswers } from '../../actions/form';
import CombineStyles from '../../utils/combine-styles';
import LayoutStyles from '../../styles/layouts';
import ButtonStyles from '../../styles/buttons';
import Styles from './styles';

const FormStep4 = ({ classes }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const containerNode = useRef(null);
    const [canvasContainerWidth, setCanvasContainerWidth] = useState(null);
    const [continueActive, setContinueActive] = useState(false);

    // measure the width of the canvas container on init and resize
    useLayoutEffect(() => {
        const measure = () => {
            if (containerNode.current) {
                window.requestAnimationFrame(() => {
                    const { width } = containerNode.current.getBoundingClientRect();
                    setCanvasContainerWidth(width);
                });
            }
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

    const onSignatureEnd = (event) => {
        event.preventDefault();
        setContinueActive(true);
    };
    const onCancelClick = useCallback(() => {
        handleClear();
        setContinueActive(false);
    }, [handleClear, setContinueActive]);
    const onSaveClick = useCallback(() => {
        const signatureImage = handleSave('image/png', 1); // Saves as PNG at 100% original quality
        dispatch(SaveAnswers({ signature: signatureImage }));
        console.log('signatureImage', signatureImage)
        history.push('/form/5');
    }, [handleSave]);

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
                                    onPointerUp={onSignatureEnd}
                                    onPointerOut={onSignatureEnd}
                                    tabIndex={0}
                                    aria-describedby="signatureTitle"
                                    id="signaturePad"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 align-items-center">
                        <div className="col-4">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => onCancelClick()}
                                className="mr-3"
                            >
                                Clear
                            </Button>
                        </div>
                        <div className="col-8 text-right">
                            <Typography variant="body1">
                                Having Trouble Signing?
                                &nbsp;<a href="http://google.com" target="_blank" rel="noopener noreferrer" className={classes.textLink}>Down form</a>
                            </Typography>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-right">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.push('/form/3')}
                                className="mr-3"
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!continueActive}
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
