import React from 'react';
import LoginForm from './loginForm';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="row">
   		<h2>Login</h2>
        <div className="col-md-4 col-md-offset-4">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;