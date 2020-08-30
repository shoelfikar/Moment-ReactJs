import React, { Component } from 'react';
import defaultProfil from '../assets/image/user.png';
import axios from 'axios';


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
        profil: ''
      }
    }
    this.getUserLogin = this.getUserLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let newUser = { ...this.state.user};
    newUser[e.target.name] = e.target.value;
    this.setState({
      user: newUser
    })
  }

  getUserLogin() {
    axios.get(`${process.env.REACT_APP_URL}/user/${this.state.userId}`)
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
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="profil-user">
                <div className="card mb-3 ">
                  <div className="image-profil d-flex justify-content-center">
                    {this.state.user.profil ? (<img src={this.state.user.profil} className="card-img-top ml-3 my-3 justify-content-center" alt="profil-user"  style={{width: "150px", height: "180px"}}/>) : (<img src={defaultProfil} className="card-img-top ml-3 my-3 justify-content-center" alt="profil-user"  style={{width: "160px", height: "180px"}}/>)}
                    
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="custom-file col-md-5 ml-3">
                      <input type="file" className="custom-file-input " id="customFile" />
                      <label className="custom-file-label">Choose file</label>
                    </div>
                  </div>
                  <div className="card-body">
                    <form className="col-md-11">
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
                        {this.state.inputPassword ? (<input type="text" className="form-control" id="password"
                        name="password" value={this.state.user.password} onChange={this.handleChange} />) : (<button type="button" className="btn btn-success col-md-12">Change Password</button>)}
                      </div>
                  </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Update</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;