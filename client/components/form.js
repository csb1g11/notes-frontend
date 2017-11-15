import React from 'react';
import { connect } from 'react-redux';
import { postNewNote } from '../redux/reducers/noteReducer';
import '../styles/mainSheet/site.scss';
import { Field, reduxForm , SubmissionError } from 'redux-form';

async function submitToServer(data) {
  try {
    let response = await fetch('http://localhost:8000/notes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    let responseJson = await response.json();
    
    return responseJson.notes;
  } catch(error) {
    console.error(error);
  }
}

const submit = ({ phrase='', definition='', context='' }) => {
  let error = {};
  let isError = false;
  let owner = 'admin';

  if (phrase.trim() === '') {
    error.phrase = "Required";
    isError = true
  }

  if (definition.trim() === '') {
    error.definition = "Required";
    isError = true
  }  

  if (context.length > 150) {
    error.context = "Too Long"
    isError = true
  }

  if (isError) {
    throw new SubmissionError(error);
  } else {
    return submitToServer({phrase, definition, context, owner})
    .then(data => {
      if (data.errors) {
        throw new SubmissionError(data.errors);
      } else {
        console.log(data)
      }
    });
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

const NoteFormFunc = ({ handleSubmit }) => (
    <form onSubmit={ handleSubmit(submit) }>
        <Field name="phrase" label="Phrase" component={renderField} type="text" />
        <Field name="definition" label="Definition" component={renderField} type="text" />
        <Field name="context" label="Context" component={renderField} type="text" />
      <button type="submit">Submit</button>
    </form>
);

const NoteForm = reduxForm({
  form: 'contact'
})(NoteFormFunc)

export default NoteForm;