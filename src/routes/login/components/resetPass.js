import React from 'react'
import PropTypes from 'prop-types'
import GetParameterByName from '../../../utils/getParam'

class ResetPasswordForm  extends React.Component {

    static propTypes = {
        location: PropTypes.object,
        resetPassCancel: PropTypes.func.isRequired,
        resetPass: PropTypes.func.isRequired,
        resetPassError: PropTypes.bool.isRequired,
        resetPassErrorMsg: PropTypes.string.isRequired
    }

    constructor(props) {

        super(props);

        this._boundSubmit = this.submit.bind(this);
        this._boundCancel = this.cancel.bind(this);

        // pull the token from the URL
        const tokenFromHash = GetParameterByName('t', this.props.location.search);

        this.state = this.initialState(tokenFromHash);
    }

    initialState(token) {

        token = token || '';

        return {
            error: false,
            tokenProvided: !!token,
            email: '',
            token,
            password: '',
            passwordConfirm: ''
        };
    }

    cancel = (event) => {

        event.preventDefault();
        this.props.resetPassCancel();
    }

    submit = (event) => {

        event.preventDefault();
        if (this.state.password !== this.state.passwordConfirm) {
            return this.setState({ error: 'Passwords do not match.' });
        }
        else if (this.state.password === ''){
            return this.setState({ error: 'Passwords cannot be blank' });
        }
        else {
            this.setState({ error: false });
            this.props.resetPass(this.state.email, this.state.token, this.state.password)
        }

    }

    onChange = (key, value) => {

        this.setState({ [key]: value })
    }

    render() {

        const { token, email, password, passwordConfirm, error, tokenProvided } = this.state
        return (
            <form onSubmit={this._boundSubmit}>
                <h2>Reset Password</h2>
                <input
                    disabled={tokenProvided}
                    placeholder='Reset Code'
                    value={token}
                    onChange={evt => this.onChange('token', evt.target.value)}
                />
                <br />
                <input
                    placeholder='Email Address'
                    autoComplete="username"
                    type='email'
                    value={email}
                    onChange={evt => this.onChange('email', evt.target.value)}
                />
                <br />
                <input
                    placeholder='New Password'
                    type='password'
                    autoComplete="new-password"
                    value={password}
                    onChange={evt => this.onChange('password', evt.target.value)}
                />
                <br />
                <input
                    placeholder='Confirm Password'
                    autoComplete="new-password"
                    type='password'
                    value={passwordConfirm}
                    onChange={evt => this.onChange('passwordConfirm', evt.target.value)}
                />
                <br />

                {error &&
                    <div>{error}</div>}

                <button onClick={this._boundCancel}>Cancel</button>
                <button type="submit" value="submit">Reset Password</button>
            </form>
        );
    }
};

export default ResetPasswordForm
