import React, { Component, Fragment } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Modal from '../Modal';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFeeds: [],
      images: [],
      tags: 'mountain',
      search: '',
      loading: false,
      name: '',
      idUser: localStorage.Id,
      pages: 20000,
      currentPage: 1
      
    }
    this.getImageFromFlickr = this.getImageFromFlickr.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.searchImageFlickr = this.searchImageFlickr.bind(this)
    this.getLoginInfo = this.getLoginInfo.bind(this)
    this.logout = this.logout.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  handleChange(value, e) {
    this.setState({
      [value]: e.target.value
    })
  }
  getImageFromFlickr(keyword) {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=13961738ab40be669def9a4f1be13560&tags=${keyword}&per_page=50&page=${this.state.currentPage}&format=json&nojsoncallback=1`)
      .then(res => {
        let datas = []
        this.setState({
          allFeeds: res.data.photos.photo,
          pages: res.data.photos.pages

        })
        this.state.allFeeds.map((value)=> {
            return datas.push({image:`https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}.jpg`, title: value.title})
        })
        this.setState({
          images:datas
        })
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  handlePageClick (e) {
    const selectedPage = e.selected;
    this.setState({
        currentPage: selectedPage,
    });
      this.getImageFromFlickr(this.state.tags)
  };



  searchImageFlickr(e) {
    e.preventDefault()
    this.getImageFromFlickr(this.state.search)
    this.setState({
      tags: this.state.search,
      search: ''
    })
  }


  getLoginInfo() {
    axios.get(`${process.env.REACT_APP_URL1}/user/${this.state.idUser}`)
      .then(res => {
        this.setState({
          name: res.data.result.full_name
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  logout() {
    Swal.fire({
      title: 'Logout from website?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.value) {
        delete localStorage.Token
        delete localStorage.Id
        this.props.history.push("/");      
      }
    })
  }

  componentDidMount() {
    this.getLoginInfo()
    if(!this.state.search){
      this.getImageFromFlickr(this.state.tags)
    }
  }

 
  render() {
    if(localStorage.getItem('Token')) {
      return(
        <Fragment>
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
              <a className="navbar-brand title-navbar" href="/">Take A moment</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item mr-4 pr-4">
                    <div className="dropdown">
                      <button className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.name}
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button className="dropdown-item" type="button" data-target="#staticBackdrop" data-toggle="modal">Profil</button>
                        <button className="dropdown-item" type="button" onClick={this.logout}>Logout</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          <section className="page-section bg-light">
          <div className="container">
            <div className="text-center">
              <h2 className="section-heading text-uppercase subtitle">Picture From Flickr</h2>
              <form className="form-inline d-flex justify-content-center mb-5" onSubmit={this.searchImageFlickr}>
                <div className="form-group mx-sm-3 mb-2">
                  <input type="text" className="form-control" id="search" placeholder="Search another tags"
                  value={this.state.search}
                  onChange={(e)=>this.handleChange("search", e)}
                  name="search" />
                </div>
                <button type="submit" className="btn btn-primary mb-2" >Search Tag</button>
            </form>
            </div>
            <div className="row"> 
            {this.state.images.map((value, index)=> {
              return(
                <div className="col-lg-4 col-sm-6 mb-4" key={index}>
                    <div className="portfolio-item">                     
                      <a className="portfolio-link" href="/">
                        <div className="portfolio-hover">
                          <img className="img-fluid" src={value.image} alt="thumbnail" />
                        </div>
                      </a>
                      <div className="portfolio-caption">
                          <div className="portfolio-caption-subheading text-muted">{value.title}</div>
                      </div>
                    </div>
                  </div> 
              )
            })}      
             </div>
          </div>
                    <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
        </section>
        <Modal />
        </Fragment>
      )
    }else {
      return <Redirect to="/" />
    }
  }
}


export default Home;