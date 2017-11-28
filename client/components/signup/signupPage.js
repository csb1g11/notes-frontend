import React from 'react';
import SignupForm from './signupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../redux/actions/signupActions';

class SignupPage extends React.Component {

  constructor(props) {
  	super(props);
  }

  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="row">
      	<h2>Sign up</h2>
        <div className="col-md-4 col-md-offset-4">
          <SignupForm
            userSignupRequest={userSignupRequest}/>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
}

export default connect(null, { userSignupRequest })(SignupPage);