import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { searchNotes } from '../redux/actions/noteActions';

class SearchBar extends Component {

  constructor(props) {
  	super(props)
  }

  render() {
    const { value } = this.props;

    return (
        <input
          className="form-control"
          placeholder = "Search for a phrase"
          onChange={(e) => this.props.dispatch(searchNotes(e.target.value))}
          value={value} />
    );
  }
} 

function mapStateToProps({ note }) {
  return {
  	value: note.searchTerm
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchNotes }, dispatch);
}

export default connect(mapStateToProps)(SearchBar);