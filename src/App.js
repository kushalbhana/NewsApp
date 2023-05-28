import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { Component } from 'react';


export default class App extends Component {

apiKey = process.env.REACT_APP_NEWS_API;
  state={
    progress:10,
  } 
  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey= {this.apiKey} key='general' pageSize={8} country="in" category="general"/>}></Route>
          <Route exact path="/Business" element={ <News setProgress={this.setProgress} apiKey= {this.apiKey} key='business'  pageSize={8} country="in" category="business"/>}></Route>
          <Route exact path="/Entertainment" element={<News setProgress={this.setProgress} apiKey= {this.apiKey} key='entertainment'  pageSize={8} country="in" category="entertainment"/>}></Route>
          <Route exact path="/General" element={ <News setProgress={this.setProgress} apiKey= {this.apiKey} key='general'  pageSize={8} country="in" category="general"/>}></Route>
          <Route exact path="/Health" element={ <News setProgress={this.setProgress} apiKey= {this.apiKey} key='health'  pageSize={8} country="in" category="health"/>}></Route>
          <Route exact path="/Science" element={ <News setProgress={this.setProgress} apiKey= {this.apiKey} key='science'  pageSize={8} country="in" category="science"/>}></Route>
          <Route exact path="/Sports" element={ <News setProgress={this.setProgress} apiKey= {this.apiKey} key='sports'  pageSize={8} country="in" category="sports"/>}></Route>
          <Route exact path="/Technology" element={ <News setProgress={this.setProgress} apiKey= {this.apiKey} key='technology}>' pageSize={8} country="in" category="technology"/>}></Route>

        </Routes>
        </Router>
      </div>
    )
  }
}


