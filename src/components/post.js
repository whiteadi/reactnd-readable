import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';

import {capitalize} from '../utils/helper';
import {bindActionCreators} from 'redux';

import {actions} from '../store';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length > 25) {
    errors.title = 'Must be 25 characters or less'
  }
  if (!values.author) {
    errors.author = 'Required'
  } else if (values.author.length > 15) {
    errors.author = 'Must be 15 characters or less'
  }
  if (!values.body) {
    errors.body = 'Required'
  }
  return errors
};


const renderInputField = (props) => {
  const { input, label, type, id, placeholder, meta } = props;
  const { touched, error } = meta;
  const className = `${touched && error && 'has-error'}`;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <input {...input} id={id} type={type} placeholder={placeholder} className={className} />
        {touched && (error && <span className="validation-error">{error}</span>) }
      </div>
    </div>
  );
};

const renderTextAreaField = (props) => {
  const { input, label, id, placeholder, meta } = props;
  const { touched, error } = meta;
  const className = `${touched && error && 'has-error'}`;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <textarea {...input} rows="4" placeholder={placeholder} className={className} />
        {touched && (error && <span className="validation-error">{error}</span>) }
      </div>
    </div>
  );
};

const renderSelectField = (props) => {
  const { input, label, id, children, meta } = props;
  const { touched, error } = meta;
  const className = `${touched && error && 'has-error'}`;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <select {...input} className={className}>
          {children}
        </select>
        {touched && (error && <span className="validation-error">{error}</span>) }
      </div>
    </div>
  );
};

const Post = (props) => {
  const {
    handleSubmit, pristine, reset, categories,
    createPost, editPost, history, match, submitting
  } = props;
  const isEdit = match.url.indexOf('edit') !== -1;
  return (
    <form className='form' onSubmit={handleSubmit(data => {
      const {title, body, category = categories[0].name, author} = data;
      data = {title, body, category, author};
      if (isEdit) {
        editPost(match.params.id, data);
      } else {
        createPost(data);
      }
      history.goBack();
    })}
    >
      <div className='form-field'>
        <div className='form-field-input'>
          <Field
            id="TheTitle"
            name='title'
            component={renderInputField}
            type='text'
            label='Title'
          />
        </div>
      </div>
      <div className='form-field'>
        <div className='form-field-input'>
          <Field
            id="TheAuthor"
            name='author'
            component={renderInputField}
            type='text'
            label='Author'
          />
        </div>
      </div>
      <div className='form-field'>
        <div className='form-field-input'>
          <Field id="TheCategory" name='category' component={renderSelectField} label="Category">
            {categories.map((category, index) =>
              <option key={index} value={category.name}>{capitalize(category.name)}</option>
            )}
          </Field>
        </div>
      </div>
      <div className='form-field'>
        <div className='form-field-input'>
          <Field
            id="TheBody"
            name='body'
            type='textarea'
            label='Body'
            component={renderTextAreaField}
          />
        </div>
      </div>
      <div className='form-field'>
        <button type='button' onClick={() => history.goBack()}>
          Back
        </button>
        <button type='submit' disabled={submitting}>
          {match.params.id ? 'Update' : 'Create'}
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear
        </button>
      </div>
    </form>
  )
};

const mapStateToProps = ({categories}) => ({
  categories
});

export default reduxForm({
  form: 'post',
  validate,
})(withRouter(connect(mapStateToProps,
  (dispatch) => ({
    createPost: bindActionCreators(actions.posts.newPost, dispatch),
    editPost: bindActionCreators(actions.posts.changePost, dispatch),
  })
)(Post)));