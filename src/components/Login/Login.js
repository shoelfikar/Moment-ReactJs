import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import background from '../../assets/image/bg-01.jpg';
import Swal from 'sweetalert2';
import './login.css';
import './utils.css';
import axios from 'axios';
import ModalReset from './Modal-Reset-Password';
import showImmage from '../../assets/image/eye.png';
import hiddenImage from '../../assets/image/hidden.png';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      },
      icon: '',
      msg: '',
      show: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.loginAccount = this.loginAccount.bind(this)
    this.alertLogin = this.alertLogin.bind(this)
    this.showPassword = this.showPassword.bind(this)
  }

  handleChange(e) {
    let newUser = { ...this.state.user};
    newUser[e.target.name] = e.target.value;
    this.setState({
      user: newUser
    })
  }

  loginAccount(e) {
    e.preventDefault()
    const data = this.state.user;
    axios
       .post(process.env.REACT_APP_URL1 + `/user/login`, data)
       .then(res => {
         if(res.data.status === 'Failed'){
            this.setState({icon: 'error',msg: res.data.message})
         }else{
           this.setState({icon: 'success', msg: res.data.message})
           localStorage.setItem("Token", res.data.result.token);
           localStorage.setItem("Id", res.data.result.id);
           this.props.history.push("/home");
         }
         this.alertLogin(this.state.msg, this.state.icon)
       })
       .catch(err => {
         this.setState({icon: 'error', msg: err.response.data.message})
         this.alertLogin(this.state.msg, this.state.icon)
       })
  }

  alertLogin(message, icon) {
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

  resetPassword(e) {
    e.preventDefault()
    const modal = document.querySelector('.modal-reset')
    modal.classList.remove('hide')
  }

  showPassword(value) {
    const password = document.querySelector(`.${value}`)
    if(this.state.show){
      this.setState({show: false})
      password.type = 'password'
    }else{
      this.setState({show: true})
      password.type = 'text'
    }

  }

  render() {
    if(!localStorage.getItem('Token')){
      return(
        <Fragment>
            <div className="limiter">
              <div className="container-login100">
                <div className="wrap-login100">
                  <form className="login100-form validate-form" onSubmit={this.loginAccount}>
                    <span className="login100-form-title p-b-43">
                      Login to continue
                    </span>
                    <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                      <input className="input100" type="text" name="email"
                      value={this.state.user.email}
                      onChange={this.handleChange} required />
                      <span className="focus-input100"></span>
                      <span className="label-input100">Email</span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                      <input className="input100 passA" type="password" name="password"
                      value={this.state.user.password}
                      onChange={this.handleChange} required />
                      {this.state.show === true ? (<img src={showImmage} alt="show-password" className="icon-password" style={{width: '20px'}} onClick={()=>this.showPassword('passA')} /> ): (<img src={hiddenImage} alt="show-password" className="icon-password" style={{width: '20px'}} onClick={()=>this.showPassword('passA')} />)}
                      <span className="focus-input100"></span>
                      <span className="label-input100">Password</span>
                    </div>
                    <div className="flex-sb-m w-full p-t-3 p-b-32">
                      <div>
                        <a href="/" className="txt1" onClick={(e)=>this.resetPassword(e)}>
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <div className="container-login100-form-btn">
                      <button className="login100-form-btn" type="submit">
                        Login
                      </button>
                    </div>
                    <div>
                      <span className="txt1 member">
                        Not a  member?
                        <Link to="/register" className="txt1 ml-1">
                           Sign Up Here
                        </Link>
                      </span>
                      <span className="txt1 member1">
                        <Link to="/" className="txt1">
                          Home
                        </Link>
                      </span>
                    </div>
                  </form>
                  <div className="login100-more" style={{backgroundImage: `url(${background})`}}>
                  </div>
                </div>
              </div>
            </div>
            <ModalReset />
        </Fragment>
      )
    }else {
      return <Redirect to="/home" />;
    }
  }
}


export default Login;