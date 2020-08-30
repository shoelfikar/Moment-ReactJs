import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import '../App.css';


class Loading extends Component {
  render() {
    return(
      <div className="loading">
        <Spinner animation="grow" />
      </div>
    )
  }
}


export default Loading;