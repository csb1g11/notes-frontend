import React from 'react';
import { connect } from 'react-redux';
import { addNote } from '../../redux/actions/noteActions';
import { InputFieldGroup, SelectFieldGroup } from '../common/inputFieldGroup';
import { validateNoteInput } from '../common/validations'
import { langOptions, langMap } from '../common/languages';

class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: '',
      definition: '',
      context: '',
      website: '',
      language: '',
      errors: {},
      isLoading: false,
      update: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validUrl = this.validUrl.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validUrl(str) {
    var pattern = new RegExp('www.?.+','i');

    return (pattern.test(str))
  }

  isValid() {
    const { errors, isValid } = validateNoteInput(this.state);

    if (!isValid) { this.setState({ errors }); }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()){
      this.props.addNote(this.state).then(
        (response) => {
          this.setState({ errors: {}, isLoading: false, phrase: '', definition: '', context: '', language: '', website: '' })
        },
        (error) => {
          this.setState({ errors: error, isLoading: false })
        }
      );
    }
  }

  render() {
    const { phrase, definition, context, language, website, errors, isLoading } = this.state;

    let mappedLanguages = langOptions.map((lang) =>
      <option key={lang.code} value={lang.code}>{lang.name}</option>
    );

    return (
      <form onSubmit={this.onSubmit}>
        <InputFieldGroup
          field="phrase"
          label="Word or Phrase"
          name="phrase"
          value={phrase}
          onChange={this.onChange}
          error={errors.phrase}
        />

        <InputFieldGroup
          field="definition"
          label="Definition"
          name="definition"
          value={definition}
          onChange={this.onChange}
          error={errors.definition}
        />

         <InputFieldGroup
          field="website"
          label="Website Link"
          name="website"
          value={website}
          type="url"
          onChange={this.onChange}
          error={errors.website}
        />

        <InputFieldGroup
          field="context"
          label="Context"
          name="context"
          value={context}
          onChange={this.onChange}
          error={errors.context}
        />

        <SelectFieldGroup
          field="language"
          label="Language"
          name="language"
          value={language}
          options={mappedLanguages}
          onChange={this.onChange}
        />
  
        <br/>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

NoteForm.propTypes = {
  addNote: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  };
}

export default connect(mapStateToProps, { addNote })(NoteForm);
