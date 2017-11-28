import React from 'react';
import { InputFieldGroup } from '../common/fieldGroups';
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/signupActions';
import { notifySuccess, notifyRejected } from '../../redux/actions/notificationActions';
import { validateSignupInput } from '../common/validations';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateSignupInput(this.state);

    if (!isValid) { this.setState({ errors }); }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        (response) => {
          notifySuccess("All signed up!");
          this.context.router.push('/login');
        },
        (error) => {
          notifyRejected("Oh dear, we had a problem. Please refresh & try again");
          this.setState({ errors: error.response.data, isLoading: false })
        }
      );
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <InputFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          value={this.state.username}
          field="username"
        />

        <InputFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <InputFieldGroup
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />

        <div className="form-group">
          <button 
              disabled={this.state.isLoading || this.state.invalid} 
              className="btn btn-primary btn-lg">
                Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { notifySuccess, notifyRejected })(SignupForm);