import React from 'react';
import { InputFieldGroup } from '../common/inputFieldGroup';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/loginActions';
import { validateLoginInput  } from '../common/validations';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateLoginInput(this.state);

    if (!isValid) { this.setState({ errors }); }
    
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      this.props.login(this.state).then(
        (response) => {
          console.log(response);
          this.context.router.push('/notes');
        },
        (error) => {
          console.log(error);
          this.setState({ errors: error, isLoading: false })
          this.context.router.push('/login');
        }
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, username, password, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <InputFieldGroup
          field="username"
          label="Username"
          value={username}
          error={errors.username}
          onChange={this.onChange}
        />

        <InputFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>
            Login
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);