import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../redux/reducers/loginReducer';

class Navigation extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  constructor(props){
    super(props);
  }

  render() {
  	console.log("prop auth", this.props);
    //const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">WWTWA</Link>
          </div>

          	<div className="collapse navbar-collapse">
				{ guestLinks }
			</div>
        </div>
      </nav>
    );
  }
}

/*
<div className="collapse navbar-collapse">
	{ isAuthenticated ? userLinks : guestLinks }
</div>


Navigation.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(Navigation);
*/

export default Navigation;