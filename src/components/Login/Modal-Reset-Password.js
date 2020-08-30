import React, { Component } from 'react';
import './modal.css';
import axios from 'axios';
import Swal from 'sweetalert2';


class ModalResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: ''
      },
      icon: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendLinkResetPassword = this.sendLinkResetPassword.bind(this)
    this.alert = this.alert.bind(this)
  }

  handleChange(e) {
    let newUser = { ...this.state.user};
    newUser[e.target.name] = e.target.value;
    this.setState({
      user: newUser
    })
  }

  cancelButton() {
    const modal = document.querySelector('.modal-reset')
    modal.classList.add('hide')
  }

  sendLinkResetPassword(e) {
    e.preventDefault()
    const data = this.state.user;
    axios
       .post(process.env.REACT_APP_URL + `/user/resetpassword`, data)
       .then(res => {
         if(res.data.status === 'Failed'){
            this.setState({icon: 'error'})
          }else{
            this.setState({icon: 'success'})
          }
          this.cancelButton()
          this.alert(res.data.message, this.state.icon)
       })
       .catch(err => {
         this.cancelButton()
         this.setState({icon: 'error'})
         this.alert(err.response.data.message, this.state.icon)
       })
  }

  alert(message, icon) {
    Swal.fire({
      position: 'center',
      icon: `${icon}`,
      title: `${message}`,
      showConfirmButton: false,
      timer: 2500
    })
    this.setState({
      user: {
        email: ''
      },
      icon: ''
    })
  }



  render() {
    return(
      <div className="modal-reset hide">
        <div className="form-reset">
          <p className="title-reset">Please enter your email address below and we'll send you instructions on how to reset your password.</p>
          <form className="change-reset" onSubmit={this.sendLinkResetPassword}>
            <div className="input-reset">
              <input type="email" placeholder="Masukkan Email"
              name="email"
              value={this.state.user.email}
              onChange={this.handleChange} />
            </div>
            <div className="button-reset">
              <button className="btn-reset" type="submit">Send Email</button>
              <button className="btn-cancel" type="button" onClick={this.cancelButton}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ModalResetPassword;