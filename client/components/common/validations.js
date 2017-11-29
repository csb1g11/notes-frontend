import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const requiredText = 'This field is required';

export function validateLoginInput({ username='', password=''}) {
  let errors = {};

  if (Validator.isEmpty(username)) { errors.identifier = requiredText; }
  if (Validator.isEmpty(password)) { errors.password = requiredText; }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export function validateSignupInput({ username='', password='', passwordConfirmation=''}) {
  let errors = {};

  if (Validator.isEmpty(username)) { errors.username = requiredText; }
  if (Validator.isEmpty(password)) { errors.password = requiredText; }
  if (Validator.isEmpty(passwordConfirmation)) { errors.passwordConfirmation = requiredText; }

  if (!Validator.equals(password, passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export function validateNoteInput({ phrase='', definition='', language='', context='', website='' }) {
  let errors = {};
  let charLimit = 'This field cannot be more than 200 characters';
  var pattern = new RegExp('[http://|https://|www]?.+','i');


  if (Validator.isEmpty(phrase)) { errors.phrase = requiredText; }
  if (Validator.isEmpty(definition)) { errors.definition = requiredText; }
  if (Validator.isEmpty(language)) { errors.language = requiredText; }

  if (phrase.length > 200) { errors.phrase = charLimit; }
  if (definition.length > 200) { errors.definition = charLimit; }
  if (website !== '' && !pattern.test(website)) { errors.website = "Please enter a valid url, beginning with http:// or https://"; }

  console.log("errors from validation", errors);

  return {
    errors,
    isValid: isEmpty(errors)
  }
}