import React, {Component} from 'react';
import { connect } from 'react-redux';
import Note from './note';
import NoteForm from './form';
import LoginForm from './login/loginForm';
import Navigation from './navigation';
import List from './list';


class Home extends Component {
  constructor(props){
    super(props);
  }

  submit = (values) => {
    console.log(values)
  }

  render() {
    return (
      <div>
        <NoteForm />
        <List />
      </div>
    )
  }
}
const mapState = ({notes, isAuthenticated, auth}) => ({notes, isAuthenticated, auth});
export default connect(mapState)(Home);