import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

class Header extends Component {
  renderAuth() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className='d-flex'>
            <Link to="/login" className='btn btn-outline-primary me-3'>Sign in</Link>
            <Link to="/register" className='btn btn-primary'>Register</Link>
          </div>
        )
      default:
        return (
          <>
            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {this.props.auth.email}
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/streams/new">Create Stream</Link>
              </li>
              <li><a className="dropdown-item" href="/">Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/api/logout">Sign Out</a></li>
            </ul>
          </>
        )
    }
  }

  render() {
    return (
      <div className='container'>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/"><i className="bi bi-envelope-paper-fill"></i> &nbsp; Team Beam</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/surveys">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/survey/new">Create Survey</Link>
                </li>
              </ul>
              {this.renderAuth()}
            </div>
          </div>
        </nav>
      </div>
    )
  }

}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(Header)
