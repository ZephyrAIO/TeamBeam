import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

class LoginForm extends React.Component {
  state = {
    submitting: false
  }

  renderInput = ({ input, type, name, htmlFor, label, meta: { touched, error } }) => {
    return (
      <div className='mb-3'>
        <label htmlFor={htmlFor} className='form-label'>{label}</label>
        <input
          {...input}
          id={htmlFor}
          type={type}
          onFocus={() => this.setState({ submitting: false })}
          className={`form-control ${touched && error && "is-invalid"}`}
          required
        />
        {touched && error && <div className="form-text invalid-feedback">{error}</div>}
      </div>
    )
  }

  onSubmit = async formValues => {
    this.setState({ submitting: true });
    let response = await this.props.onSubmit(formValues)
    if (response === 401) {
      throw new SubmissionError({
        email: "The email or password is incorrect.",
        password: "The email or password is incorrect."
      })
    }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div className='mt-4'>
        <form onSubmit={handleSubmit(this.onSubmit)} noValidate>
          <Field component={this.renderInput} type='email' name='email' htmlFor='email' label='Email Address' />
          <Field component={this.renderInput} type='password' name='password' htmlFor='password' label='Password' />
          <button type="submit" className='btn btn-primary mb-3' disabled={this.state.submitting}>Login</button>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm)