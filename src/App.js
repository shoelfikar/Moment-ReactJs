import React, {Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filckrImage: [],
      bgImage : [],
      index: 0
    }
    this.getBackground = this.getBackground.bind(this)
  }

  getBackground() {
    axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=13961738ab40be669def9a4f1be13560&tags=mountain&format=json&nojsoncallback=1')
      .then(res => {
        let datas = []
        this.setState({
          filckrImage: res.data.photos.photo
        })
        this.state.filckrImage.map((value)=> {
            return datas.push(`https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}.jpg`)
        })
        this.setState({
          bgImage:datas
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.getBackground()
    setInterval(() => {
      this.setState({
        index : this.state.index + 1
      })
    }, 10000);
  }

  render() {
    const bg = `url(${this.state.bgImage[`${this.state.index}`]})`
  return (
    <Fragment>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <a className="navbar-brand title-navbar" href="/">Take A moment</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
    <header className="masthead" style={{backgroundImage: bg }}>
      <div className="container">
        <div className="masthead-subheading">
          Welcome To Our Website!
        </div>
        <div className="masthead-heading text-uppercase">
          It's Nice To Meet You
        </div>
        <Link to="/login" className="btn btn-primary btn-xl text-uppercase js-scroll-trigger">Login Here!</Link>
      </div>
    </header>
      <footer className="footer py-4">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12 text-center py-2">
                        <a className="btn btn-dark btn-social mx-2" href="https://instagram.com/shoelfikar"><i className="fab fa-instagram"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="https://github.com/shoelfikar"><i className="fab fa-github"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="https://www.linkedin.com/in/sulfikardi/" ><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <div className="col-lg-12 text-center">Copyright © Sulfikardi 2020</div>
                </div>
            </div>
      </footer>
    </Fragment>
  );
  }
}

export default App;
