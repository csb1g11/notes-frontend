import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchNotes, deleteNote, updateNote, 
  saveUpdatedNote, cancelUpdate } from '../../redux/actions/noteActions';
import { InputFieldGroup, SelectFieldGroup } from '../common/fieldGroups';
import SearchBar from '../searchBar';
import NoteForm from './noteForm';
import { langOptions, langMap } from '../common/languages';
import { validateNoteInput } from '../common/validations';

class NoteList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      phrase: '',
      definition: '',
      context: '',
      website: '',
      language: '',
      url: '',
      errors: {},
      updateInProgress: false,
      isLoading: false,
      selectedLanguage: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.toggleAddPanel = this.toggleAddPanel.bind(this);
    this.filterByLanguage = this.filterByLanguage.bind(this);
    this.filterBySearchTerm = this.filterBySearchTerm.bind(this);
  }

  onUpdate(note) {
    this.props.dispatch(updateNote(note))
    this.setState({ 
      phrase: note.phrase, 
      definition: note.definition,
      context: note.context,
      website: note.website,
      language: note.language,
      url: note.url,
      updateInProgress: true,
      errors: {},
      addPanel: false
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCancel(note) {
    this.setState({ updateInProgress: false });
    this.props.dispatch(fetchNotes(this.props.user));
  }

  isValid() {
    const { errors, isValid } = validateNoteInput(this.state);

    if (!isValid) { this.setState({ errors }); }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()){
      this.props.dispatch(saveUpdatedNote(this.state, this.props.user)).then(
        (response) => {
          this.setState({ updateInProgress: false, 
                          errors: {}, 
                          isLoading: 
                          false, phrase: '', 
                          definition: '', 
                          context: '', 
                          language: '', 
                          website: '' })
        },
        (error) => {
          this.setState({ errors: error, 
                          isLoading: false })
        }
      );
    }
  }

  onLanguageChange(e) {
    this.setState({ 'selectedLanguage': e.target.value })
  }

  componentWillMount() {
    this.props.dispatch(fetchNotes(this.props.user));
  }

  toggleAddPanel() {
    let currentPanel = this.state.addPanel;
    this.setState({ 'addPanel' : !currentPanel });
    $('#addPanel').toggle();
  }

  filterByLanguage(selectedLanguage, filteredNotes, notes) {
     if (selectedLanguage != '' && selectedLanguage != 'All') {
        filteredNotes = notes.filter((val) => val.language == selectedLanguage);
      } else {
        filteredNotes = notes;
      }
      return filteredNotes;
  }

  filterBySearchTerm(searchTerm, filteredNotes) {
    let regex = new RegExp(searchTerm, "i");
    if (searchTerm !== '') {
      filteredNotes = filteredNotes.filter((val) => 
        (regex.test(val.phrase) || regex.test(val.definition))
      );
    }
    return filteredNotes;
  }

  render() {
    const { notes, searchTerm, user } = this.props;
    const { errors, addPanel } = this.state;

    let filteredNotes = [];
    let selectedLanguage = this.state.selectedLanguage || '';
    let mappedNotes = "Add some notes to see them here!";
    let availableLanguages = [];

    if (notes !== undefined) {

      filteredNotes = this.filterByLanguage(selectedLanguage, filteredNotes, notes);
      filteredNotes = this.filterBySearchTerm(searchTerm, filteredNotes);

      let allMappedLanguages = langOptions.map((lang) =>
        <option key={lang.code} value={lang.code}>{lang.name}</option>
      );

      availableLanguages = [...new Set(notes.map(note => note.language))];

      mappedNotes = filteredNotes.map(note => 
        <li key={note.url}>
          <div className="panel panel-default">
              <div className="panel-heading">
                   <h3 className="panel-title pull-left">{note.phrase}</h3>
                    <button id="deleteButton" 
                      type="button" onClick={() => this.props.dispatch(deleteNote(note, user))} 
                      className="btn pull-right btn-danger">
                        Delete
                    </button>
                    { !note.update 
                      && !this.state.updateInProgress 
                      && <button 
                            type="button" 
                            id="updateButton" 
                            onClick={() => this.onUpdate(note)} 
                            className="btn pull-right btn-info">
                              Update
                         </button>}
                    { note.update 
                      && <button 
                            type="button" 
                            onClick={() => this.onCancel(note)} 
                            className="btn btn-default pull-right">
                              Cancel
                         </button>}
                  <div className="clearfix"></div>
              </div>
              <div className="panel-body">
                { !note.update && 
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <b>Definition</b> 
                        <div>
                          {note.definition}
                        </div>
                    </div>
                    <div className="col">
                      <b>{ note.website && <a href={note.website}>
                    <span className="glyphicon glyphicon-link"></span></a> } Context</b> 
                      <div>
                        {note.context}
                      </div>
                    </div>
                  </div>
                  <p className="pull-right" id="language">
                     Language: {langMap[note.language]}
                  </p>
                </div>

                }
                { note.update && 
                <div>
                  <form onSubmit={this.onSubmit}>
                    <InputFieldGroup
                      field="definition"
                      label="Definition"
                      name="definition"
                      value={this.state.definition}
                      error={errors.definition}
                      onChange={this.onChange}
                    />

                    <InputFieldGroup
                      field="context"
                      label="Context"
                      name="context"
                      value={this.state.context}
                      error={errors.context}
                      onChange={this.onChange}
                    />

                    <InputFieldGroup
                      field="website"
                      label="Website Link"
                      name="website"
                      value={this.state.website}
                      error={errors.website}
                      onChange={this.onChange}
                    />

                    <SelectFieldGroup
                      field="language"
                      label="Language"
                      name="language"
                      value={this.state.language}
                      options={allMappedLanguages}
                      onChange={this.onChange}
                    />

                    <button type="submit" 
                            className="btn btn-success">
                              Update
                    </button>
                  </form>
                </div>
                }
              </div>
          </div>
        </li>
      );
    }

    let mappedLanguages = availableLanguages.map(language => 
        <option key={language} value={language}>{langMap[language]}</option>
    );

    return <div>
              <h2>Notes</h2>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    <SearchBar />
                  </div>
                  <div className="col-sm-2">
                    <button className="btn btn-success addButton" 
                            onClick={this.toggleAddPanel}>
                      { !addPanel && <span className="glyphicon glyphicon-plus"></span>}
                      { addPanel && <span className="glyphicon glyphicon-minus"></span>}
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <div className="pull-right">
                      <label>Language: </label>
                      <select value={this.state.selectedLanguage} 
                              onChange={this.onLanguageChange}>
                        <option key="all" value="All">All</option>
                        {mappedLanguages}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="panel panel-default initiallyHidden" id="addPanel">
                <div className="panel-heading">Add Note</div>
                <div className="panel-body">
                  <NoteForm />
                </div>
              </div>
              <ul>{mappedNotes}</ul>
          </div>
  }
};

function mapStateToProps(state) {
  return {
    notes: state.note.notes,
    user: state.login.user,
    searchTerm: state.note.searchTerm
  };
}

export default connect(mapStateToProps)(NoteList);