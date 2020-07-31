import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
    wrapper: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const ErrorBoundry = () => {
    const history = useHistory();
    return (
        <main className={`container-fluid ${styles.wrapper}`} role="alert">
            <div className="row align-items-center" style={{ height: '100%' }}>
                <div className="col">
                    <Typography variant="h1">Oops, there was an error</Typography>

                    <Button onClick={() => history.push('/')}>
                        Reload Site
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default ErrorBoundry;
