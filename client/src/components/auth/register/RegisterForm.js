import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

class RegisterForm extends React.Component {
  state = {
    submitting: false
  }

  renderInput = ({ input, type, htmlFor, label, meta: { touched, error } }) => {
    return (
      <div className='mb-3'>
        <label htmlFor={htmlFor} className='form-label'>{label}</label>
        <input
          {...input}
          id={htmlFor}
          type={type}
          onFocus={() => this.setState({ submitting: false })}
          className={`form-control border-5 ${touched && error && "is-invalid"} ${!error && "is-valid"}`}
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
        email: "That email is already taken.",
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
          <Field component={this.renderInput} type='password' name='repassword' htmlFor='repassword' label='Confirm Password' />
          <button type="submit" className='btn btn-primary mb-3' disabled={this.state.submitting}>Register</button>
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
  if (!values.repassword) {
    errors.repassword = 'Required'
  }
  if (values.password !== values.repassword) {
    errors.password = 'Password must match'
    errors.repassword = 'Password must match'
  }
  const expression = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  if (expression.test(values.password) === false) {
    errors.password = 'Password requires uppercase letter, number, special character, and 8 to 30 characters.'
  }
  return errors
}

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm)