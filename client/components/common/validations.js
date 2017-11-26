import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function validateLoginInput({ username='', password=''}) {
  let errors = {};

  if (Validator.isEmpty(username)) {
    errors.identifier = 'This field is required';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export function validateSignupInput({ username='', password='', passwordConfirmation=''}) {
  let errors = {};

  if (Validator.isEmpty(username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(password, passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export function validateNoteInput({ phrase='', definition='', language='', context='' }) {
  let errors = {};

  if (Validator.isEmpty(phrase)) {
    errors.phrase = 'This field is required';
  }
  if (Validator.isEmpty(definition)) {
    errors.context = 'This field is required';
  }
  if (Validator.isEmpty(language)) {
    errors.language = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}