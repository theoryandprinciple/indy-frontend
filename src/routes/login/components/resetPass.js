import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GetParameterByName from '../../../utils/getParam';

class ResetPasswordForm extends React.Component {
    static propTypes = {
        location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired,
        resetPassCancel: PropTypes.func.isRequired,
        resetPass: PropTypes.func.isRequired,
        resetPassError: PropTypes.bool.isRequired,
        resetPassErrorMsg: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.boundSubmit = this.submit.bind(this);
        this.boundCancel = this.cancel.bind(this);

        // pull the token from the URL
        const { location } = props;
        const tokenFromHash = GetParameterByName(
            't',

            location.search,
        );

        this.state = this.initialState(tokenFromHash);
    }

    cancel = (event) => {
        event.preventDefault();
        const { resetPassCancel } = this.props;
        resetPassCancel();
    };

    submit = (event) => {
        const { state } = this;

        event.preventDefault();
        if (state.password !== state.passwordConfirm) {
            return this.setState({ presubmitError: 'Passwords do not match.' });
        } if (state.password === '') {
            return this.setState({
                presubmitError: 'Passwords cannot be blank',
            });
        }
        this.setState({ presubmitError: false });

        const { resetPass } = this.props;
        resetPass(
            state.email,
            state.token,
            state.password,
        );

        return true;
    };

    onChange = (key, value) => {
        this.setState({ [key]: value });
    };

    initialState(tok) {
        const token = tok || '';

        return {
            presubmitError: false,
            tokenProvided: !!token,
            email: '',
            token,
            password: '',
            passwordConfirm: '',
        };
    }

    render() {
        const {
            token,
            email,
            password,
            passwordConfirm,
            presubmitError,
            tokenProvided,
        } = this.state;
        const { resetPassError, resetPassErrorMsg } = this.props;

        let errorMsg;

        // prioritize pre-submit errors
        if (presubmitError) {
            errorMsg = presubmitError;
        } else if (resetPassError) {
            errorMsg = resetPassErrorMsg;
        }
        return (
            <form onSubmit={this.boundSubmit}>
                <h2>Reset Password</h2>
                <TextField
                    disabled={tokenProvided}
                    placeholder="Reset Code"
                    value={token}
                    onChange={evt => this.onChange('token', evt.target.value)}
                />
                <br />
                <TextField
                    placeholder="Email Address"
                    autoComplete="username"
                    type="email"
                    value={email}
                    onChange={evt => this.onChange('email', evt.target.value)}
                />
                <br />
                <TextField
                    placeholder="New Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={evt => this.onChange('password', evt.target.value)
                    }
                />
                <br />
                <TextField
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    type="password"
                    value={passwordConfirm}
                    onChange={evt => this.onChange('passwordConfirm', evt.target.value)
                    }
                />
                <br />

                {errorMsg && <p>{errorMsg}</p>}

                <Button onClick={this.boundCancel}>Cancel</Button>
                <Button type="submit" value="submit">
                    Reset Password
                </Button>
            </form>
        );
    }
}

export default ResetPasswordForm;
