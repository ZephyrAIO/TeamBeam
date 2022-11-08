import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUpLocal } from '../../../actions'
import RegisterForm from './RegisterForm'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authMethod: null
    }
  }

  onClickEmail() {
    this.setState({ authMethod: 'email' })
  }

  onClickGoogle() {
    this.setState({ authMethod: 'google' })
  }

  renderLoginOptions() {
    return (
      <>
        <h3>Register</h3>
        <div className='mt-4'>
          <div>
            <button className='btn btn-primary' onClick={() => this.onClickEmail()}><i className="bi bi-envelope-fill me-1"></i> Register with Email</button>
          </div>

          <div className='my-0'>&nbsp;</div>

          <div>
            <a href="/auth/google" className='btn btn-danger' onClick={() => this.onClickGoogle()}><i className="bi bi-google me-1"></i> Sign in with Google</a>
          </div>
        </div>
      </>
    )
  }

  onSubmitLocal = async formValues => {
    let response = await this.props.signUpLocal(formValues)
    return response
  }

  renderLoginForm() {
    return (
      <>
        <button className='btn btn-light' onClick={() => this.setState({ authMethod: null })}><i className="bi bi-arrow-left"></i> Back</button>
        <h3>Register with Email and Password</h3>
        <RegisterForm onSubmit={this.onSubmitLocal} />
      </>
    )
  }

  render() {
    return (
      <>
        {this.state.authMethod === null && this.renderLoginOptions()}
        {this.state.authMethod === 'email' && this.renderLoginForm()}
      </>
    )
  }
}

export default connect(null, { signUpLocal })(Register)