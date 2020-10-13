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
import useSignaturePad from 'react-hook-signature';

import Styles from './styles';

const ESignature = ({
    classes,
    clearButtonOptions,
    saveButtonOptions,
}) => {
    const containerNode = useRef(null);
    const [canvasContainerWidth, setCanvasContainerWidth] = useState(null);
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);

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
        setSaveButtonEnabled(true);
    };
    const onCancelClick = useCallback(() => {
        handleClear();
        setSaveButtonEnabled(false);

        if (clearButtonOptions.onClick) {
            clearButtonOptions.onClick();
        }
    }, [handleClear, setSaveButtonEnabled, clearButtonOptions]);
    const onSaveClick = useCallback(() => {
        const signatureImage = handleSave('image/png', 1); // Saves as PNG at 100% original quality
        saveButtonOptions.onClick(signatureImage);
    }, [handleSave, saveButtonOptions]);

    useEffect(() => {
        document.getElementById('signaturePad').focus();
    }, []); // eslint-disable-line

    return (
        <>
            <div ref={containerNode} className={`row ${classes.canvasContainer}`}>
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
            <div className="row">
                <div className={`d-flex align-items-start flex-column ${classes.buttonsContainer}`}>
                    { clearButtonOptions.text && (
                        <Button
                            variant="outlined"
                            color="primary"
                            aria-label={clearButtonOptions.ariaLabel}
                            onClick={onCancelClick}
                        >
                            {clearButtonOptions.text}
                        </Button>
                    )}
                </div>
            </div>
            <div className="row">
                <div className={`d-flex justify-content-center ${classes.buttonsContainer}`}>
                    <Button
                        aria-disabled={!saveButtonEnabled}
                        disableRipple={!saveButtonEnabled}
                        variant="contained"
                        color="primary"
                        aria-label={saveButtonOptions.ariaLabel}
                        onClick={saveButtonEnabled ? onSaveClick : null}
                    >
                        {saveButtonOptions.text}
                    </Button>
                </div>
            </div>
        </>
    );
};

ESignature.defaultProps = {
    clearButtonOptions: null,
};

ESignature.propTypes = {
    classes: PropTypes.object.isRequired,
    clearButtonOptions: PropTypes.shape({
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        ariaLabel: PropTypes.string,
    }),
    saveButtonOptions: PropTypes.shape({
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        ariaLabel: PropTypes.string,
    }).isRequired,
};

export default withStyles(Styles)(ESignature);
