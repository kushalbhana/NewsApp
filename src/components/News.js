import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  articles = []
  constructor(){
    super();
    this.state= {
      articles: this.articles,
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=d0f6537f206e489a9d84599acc223c42&page=1&pageSize=20";
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({articles : parseddata.articles, totalResults: parseddata.totalResults});
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d0f6537f206e489a9d84599acc223c42&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles : parseddata.articles
    })
  }
  handleNextClick = async () => {
    console.log("Next")
    if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){

    }else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d0f6537f206e489a9d84599acc223c42&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles : parseddata.articles
      })
    }
  }
  
  render() {
    return (
      <div className='container my-3'>
        <h1>Top Headlines</h1>
          <div className="row my-3"> 
          {this.state.articles.map((element)=>{
            return <div className="col-md-3 my-2" key = {element.url}>
            <NewsItem title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0, 88):""} imageUrl= {element.urlToImage} 
            newsUrl = {element.url}/>

          </div>
          })}
            
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled= {this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-dark"> &larr; Previous</button>
          <button type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
          </div>
      </div>
      
    )
  }
}

export default News
