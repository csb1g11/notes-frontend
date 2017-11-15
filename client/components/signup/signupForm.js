import React from 'react';
import { connect } from 'react-redux';
import { getToken } from '../../redux/reducers/loginReducer';
import '../../styles/mainSheet/site.scss';
import { Field, reduxForm , SubmissionError } from 'redux-form';


const submit = ({ username='', password='' }) => {
  let error = {};
  let isError = false;
  let owner = 'admin';

  if (username.trim() === '') {
    error.username = "Required";
    isError = true
  }

  if (password.trim() === '') {
    error.password = "Required";
    isError = true
  }  


  if (isError) {
    throw new SubmissionError(error);
  } else {
    this.setState({ errors: {}, isLoading: true });
    this.props.login(this.state).then(
      (res) => this.context.router.push('/'),
      (err) => this.setState({ error: err.response.data.errors, isLoading: false })
    );
  }
}

const renderField = ({ label, input, meta : { touched, error} }) => (
  <div className="input-raw">
    <label>{label}</label>
    <br />
    <input {...input} type="text"/>
    {touched && error && 
      <span className="error">{error}</span>}
  </div>
);

const SignupFormFunc = ({ handleSubmit }) => (
    <form onSubmit={ handleSubmit(submit) }>
        <Field name="username" label="Username" component={renderField} type="text" />
        <Field name="password" label="Password" component={renderField} type="text" />
      <button type="submit">Submit</button>
    </form>
);

const SignupForm = reduxForm({
  form: 'Signup'
})(SignupFormFunc)

export default SignupForm;