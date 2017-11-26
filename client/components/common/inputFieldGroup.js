import React from 'react';
import classnames from 'classnames';

export const InputFieldGroup = ({ field, value, label, error, type, onChange, checkUserExists }) => {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label className="control-label">{label}</label>
      <input
        onChange={onChange}
        onBlur={checkUserExists}
        value={value}
        type={type}
        name={field}
        className="form-control"
      />
    {error && <span className="help-block">{error}</span>}
    </div>  );
}

InputFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  checkUserExists: React.PropTypes.func
}

InputFieldGroup.defaultProps = {
  type: 'text'
}

export const SelectFieldGroup = ({ field, value, name, options, label, onChange }) => {
  return (
      <div className={classnames('form-group')}>
        <label className="control-label">
          {label} 
        </label>
        <select 
          className="form-control" 
          value={value} 
          name={field} 
          onChange={onChange}>
          options={options}
        </select>
      </div>
    );
}

SelectFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
     code: React.PropTypes.string,
     name: React.PropTypes.string,
   })),
  onChange: React.PropTypes.func.isRequired
}