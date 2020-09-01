import React, { Component, Fragment } from 'react';
import axios from'axios';
import Swal from'sweetalert2';


class ConfirmRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token : this.props.match.params.token,
      icon: '',
      msg: ''
    }
    this.confirmRegister = this.confirmRegister.bind(this)
  }

  confirmRegister() {
    axios.get(`${process.env.REACT_APP_URL}/user/activated?token=${this.state.token}`)
      .then(res => {
        this.setState({
          icon: 'success',
          msg: res.data.message
        })
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err.response)
        this.setState({
          icon: 'error',
          msg: err.response.data.message
        })
        this.alert(this.state.msg, this.state.icon)
      })
  }

  alert(message, icon) {
    Swal.fire({
      position: 'center',
      icon: `${icon}`,
      title: `${message}`,
      showConfirmButton: false,
      timer: 1800
    })
    this.setState({
      icon: '',
      msg: ''
    })
  }




  render() {
    return(
      <Fragment>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <a className="navbar-brand title-navbar" href="/">Take A moment</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            </div>
          </nav>

          <header className="d-flex flex-column justify-content-center align-item-center">
            <div className="container mt-5">
              <div className="masthead-subheading text-dark text-center">
                Welcome To Our Website!
              </div>
              <div className="text-uppercase text-dark display-4 text-center">
                Enter Button To Complete Activation!
              </div>
            </div>
          </header>
          <div className="row">
              <button className="btn btn-outline-success btn-xl text-uppercase col-md-2 center-block mx-auto mt-5" onClick={this.confirmRegister}>Activated</button>
          </div>
      </Fragment>
    )
  }
}


export default ConfirmRegister;