import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/loginActions';
import { WARNING, SUCCESS } from "../../redux/actions/types";
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/mainSheet/ReactToastify.min.scss';

class Navigation extends React.Component {

	constructor(props) {
    	super(props);
  }
  
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }


  componentDidUpdate(prevState, prevProps){
  	let text = this.props.text;
  	let type = this.props.type;
  	if (!text) return;
    console.log("type", type);
    console.log("text", text);

  	if((!prevState) || (text != prevState.text)) {
  		if (!type) {
  			toast.info(this.props.text);
  		} else if (type === WARNING){
  			toast.warn(this.props.text);
  		} else if (type === SUCCESS) {
  			toast.success(this.props.text);
  		}
  	}
  }
  
  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
      	<li><Link to="/notes">My notes</Link></li>
      	<li><Link to="/note">New note</Link></li>
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
				{ isAuthenticated ? userLinks : guestLinks }
			</div>
        </div>

        <ToastContainer 
          position="bottom-left"
          type="warning"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
      </nav>
    );
  }
}


Navigation.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    text: state.notification.text,
    type: state.notification.type
  };
}

export default connect(mapStateToProps, { logout })(Navigation);