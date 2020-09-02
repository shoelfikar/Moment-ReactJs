import React, { Component } from 'react';
import defaultProfil from '../assets/image/user.png';
import axios from 'axios';
import Swal from 'sweetalert2';




class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPassword: false,
      userId: localStorage.Id,
      user: {
        full_name: '',
        username: '',
        email: '',
        password: '',
        profil: null
      },
      msg: '',
      newProfil: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.getUserLogin = this.getUserLogin.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.updateProfil = this.updateProfil.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleChange(e) {
    let newUser = { ...this.state.user};
    newUser[e.target.name] = e.target.value;
    this.setState({
      user: newUser
    })
  }

  handleUpload (e) {
    // let newUser = { ...this.state.user};
    const file = e.target.files[0]
    // const file2 = e.target.files[0]
    // newUser.profil = file2
    // this.setState({user: newUser})
    const nama = document.querySelector('.test1')
    const fr = new FileReader()
    fr.onload = f => {
      const image = f.target.result
      nama.src = image
    }
    fr.readAsDataURL(file)
    // console.log(this.state.user)
    const file2 = e.target.files[0]
    let newUser = { ...this.state.user};
    newUser.profil = file2
    this.setState({user: newUser})
    console.log(newUser.profil)
  }


  getUserLogin() {
    axios.get(`${process.env.REACT_APP_URL1}/user/${this.state.userId}`)
      .then(res => {
        this.setState({user: {
          full_name: res.data.result.full_name,
          username: res.data.result.username,
          email: res.data.result.email,
          profil: res.data.result.profil
        }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  updateProfil(e) {
    const data = this.state.user;
    let fd = new FormData()
    fd.set('full_name', data.full_name)
    fd.set('username', data.username)
    fd.set('email', data.email)
    fd.set('password', data.password)
    fd.append('profil', data.profil )
    axios.put(`${process.env.REACT_APP_URL1}/user/update/${this.state.userId}`, fd)
        .then(res => {
          this.alert(res.data.message, 'success')
        })
        .catch(err => {
          this.alert(err.response.message, 'error')
        })
  }

  changePassword(value) {
    if(value === 'close') {
      this.setState({inputPassword: false})
    }else {
      this.setState({inputPassword: true})
    }
  }


  alert(message, icon) {
    Swal.fire({
      position: 'center',
      icon: `${icon}`,
      title: `${message}`,
      showConfirmButton: false,
      timer: 1800
    })
  }


  componentDidMount() {
    this.getUserLogin()
  }

  render() {
    return(
      <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false"aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">My Profil</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={()=>this.changePassword('close')}>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="profil-user">
                <div className="card mb-3 ">
                  <div className="image-profil d-flex justify-content-center">
                    {this.state.user.profil ? (<img src={this.state.user.profil} className="test1 card-img-top ml-3 my-3 justify-content-center" alt="profil-user"  style={{width: "150px", height: "180px"}}/>) : (<img src={defaultProfil} className="card-img-top ml-3 my-3 justify-content-center" alt="profil-user"  style={{width: "160px", height: "180px"}}/>)}
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <div className="custom-file col-md-5 ml-3">
                      <input type="file" className="custom-file-input " id="customFile" name="profil" onChange={this.handleUpload}/>
                      <label className="custom-file-label">Choose file</label>
                      <small className="mb-2">{this.state.msg}</small>
                    </div>
                  </div>
                  <div className="card-body">
                    <form className="col-md-11 mt-2">
                    <div className="form-group">
                        <input type="text" className="form-control" id="full_name" name="full_name"
                        value={this.state.user.full_name}
                        onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" id="username" name="username"
                        value={this.state.user.username}
                        onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" id="email" name="email"
                        value={this.state.user.email}
                        onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        {this.state.inputPassword ? (<input type="password" className="form-control" id="password"
                        name="password" value={this.state.user.password} onChange={this.handleChange} />) : (<button type="button" className="btn btn-success col-md-12" onClick={()=>this.changePassword('change')}>Change Password</button>)}
                      </div>
                  </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>this.changePassword('close')}>Close</button>
              <button type="button" className="btn btn-primary" onClick={this.updateProfil}>Update</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;