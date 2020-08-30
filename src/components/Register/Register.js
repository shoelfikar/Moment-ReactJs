import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom'
import '../Login/login.css';
import '../Login/utils.css';
import background from '../../assets/image/bg-01.jpg';
import Swal from 'sweetalert2';
import axios from 'axios';
import showImmage from '../../assets/image/eye.png';
import hiddenImage from '../../assets/image/hidden.png';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : {
        full_name: '',
        username: '',
        email: '',
        password: ''
      },
      show:false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.registerSuccess = this.registerSuccess.bind(this)
    this.showPassword = this.showPassword.bind(this)
  }

  handleChange = e => {
    let newUser = { ...this.state.user };
    newUser[e.target.name] = e.target.value;
    this.setState({
      user: newUser
    });
  };

  handleRegister(e) {
    e.preventDefault()
    const data = this.state.user;
    axios
      .post(process.env.REACT_APP_URL + `/user/register`, data)
      .then(res => {
        this.registerSuccess(data.email, res.data.message, 'success')
        this.setState({
          user : {
            full_name: '',
            username: '',
            email: '',
            password: ''
          }
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  registerSuccess( email,message, ikon) {
    Swal.fire({
      position: 'center',
      icon: `${ikon}`,
      title: `${message}!`,
      html: `We sent a verification link to ${email}. Please check your email for the next step.`,
      showConfirmButton: false,
      timer: 4500
    })
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
    if(!localStorage.getItem('Token')) {
      return(
        <Fragment>
            <div className="limiter">
              <div className="container-login100">
                <div className="wrap-login100">
                  <form className="login100-form-register validate-form" onSubmit={this.handleRegister}>
                    <span className="login100-form-title p-b-43">
                      Register account!
                    </span>
                    <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                      <input className="input100" type="text" name="full_name"
                      value={this.state.user.full_name}
                      onChange={this.handleChange} required />
                      <span className="focus-input100"></span>
                      <span className="label-input100">Fullname</span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                      <input className="input100" type="text" name="username"
                      value={this.state.user.username}
                      onChange={this.handleChange} required />
                      <span className="focus-input100"></span>
                      <span className="label-input100">Username</span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                      <input className="input100" type="email" name="email"
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
                    <div className="container-login100-form-btn">
                      <button className="login100-form-btn" type="submit">
                        Register
                      </button>
                    </div>
                    <div>
                      <span className="txt1 member">
                      Already a member? 
                        <Link to="/login" className="txt1">
                          Log in here.
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
        </Fragment>
      )
    }else {
      return <Redirect to="/home" />
    }
  }
}


export default Register;