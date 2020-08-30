import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import './utils.css';
import background from '../../assets/image/bg-01.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';
import showImmage from '../../assets/image/eye.png';
import hiddenImage from '../../assets/image/hidden.png';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : {
        password: '',
        confirmPassword: ''
      },
      icon: '',
      msg: '',
      show: false,
      hide: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.confirmResetPassword = this.confirmResetPassword.bind(this)
    this.alertConfirm = this.alertConfirm.bind(this)
    this.showPassword = this.showPassword.bind(this)
  }

  handleChange(e) {
    let newUser = { ...this.state.user};
    newUser[e.target.name] = e.target.value;
    this.setState({
      user: newUser
    })
  }

  alertConfirm(message, icon) {
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

  confirmResetPassword(e) {
    e.preventDefault()
    const params = this.props.match.params.token
    console.log(params)
    console.log(this.state.user.password)
    if(this.state.user.password === this.state.user.confirmPassword) {
      axios
          .post(`${process.env.REACT_APP_URL}/user/confirmresetpassword/${params}`, {
            password:this.state.user.password
          })
          .then(res => {
            this.setState({
              msg: res.data.message,
              icon: 'success'
            })
            this.alertConfirm(this.state.msg, this.state.icon)
            this.props.history.push("/login");
          })
          .catch(err => {
            this.setState({
              msg: 'Something wrong, Check server!',
              icon: 'error'
            })
            this.alertConfirm(this.state.msg, this.state.icon)
          })
    }else {
      this.alertConfirm('Confirmasi password salah!', 'error')
    }
  }

  showPassword(value) {
    const password = document.querySelector(`.${value}`)
    if(this.state.show || this.state.hide){
      if(value === 'passA'){
        this.setState({show: false})
      }else{
        this.setState({hide: false})
      }
      password.type = 'password'
    }else{
      if(value === 'passA'){
        this.setState({show: true})
      }else{
        this.setState({hide: true})
      }
      password.type = 'text'
    }
  }

  render() {
    return(
      <Fragment>
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                <form className="login100-form validate-form" onSubmit={this.confirmResetPassword}>
                  <span className="login100-form-title p-b-43" onClick={this.showPassword}>
                    Reset Password
                  </span>
                  <div className="wrap-input100 validate-input">
                    <input className="input100 passA" type="password" name="password"
                    value={this.state.user.password}
                    onChange={this.handleChange} />
                   {this.state.show === true ? (<img src={showImmage} alt="show-password" className="icon-password" style={{width: '20px'}} onClick={()=>this.showPassword('passA')} /> ): (<img src={hiddenImage} alt="show-password" className="icon-password" style={{width: '20px'}} onClick={()=>this.showPassword('passA')} />)}
                    <span className="focus-input100"></span>
                    <span className="label-input100">New Password</span>
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Password is required">
                  
                    <input className="input100 passB" type="password" name="confirmPassword"
                    value={this.state.user.confirmPassword}
                    onChange={this.handleChange} />
                    {this.state.hide === true ? (<img src={showImmage} alt="show-password" className="icon-password" style={{width: '20px'}} onClick={()=>this.showPassword('passB')} /> ): (<img src={hiddenImage} alt="show-password" className="icon-password" style={{width: '20px'}} onClick={()=>this.showPassword('passB')} />)}
                    <span className="focus-input100"></span>
                    <span className="label-input100"> Confirm New Password</span>
                  </div>
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn" type="submit">
                      Confirm Reset Password
                    </button>
                  </div>
                  <div>
                    <span className="txt1 reset-password">
                      <Link to="/login" className="txt1">
                        Back to Login.
                      </Link>
                      </span>
                    </div>
                </form>
                <div className="login100-more" style={{backgroundImage: `url(${background})`}}>
				        </div>
              </div>
            </div>
          </div>
      </Fragment>
    )
  }
}


export default ForgotPassword;