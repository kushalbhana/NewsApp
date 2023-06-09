import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";



export class News extends Component {
  articles = [];
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - DailyStories`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(50);
    let parseddata = await data.json();
    this.props.setProgress(80);
    this.setState({
      loading: false,
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
    });
    this.props.setProgress(100);
  }


  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    this.setState({
      page: this.state.page + 1
    })
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      loading: false,
      page: this.state.page,
      articles: this.state.articles.concat(parseddata.articles),
    });
  };

  render() {
    return (
      <div className="container my-3" style={{color: this.props.mode==='dark'?'white':'black'}}>
        <h1  style={{ margin: "20px 0px", marginTop: '70px' }}>DailyStories - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="container"></div>
        <div className="row my-3">
          {this.state.articles.map((element) => {
              return (
                <div className="col-md-3 my-2" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  mode= {this.props.mode}/>
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
         
        </div>
      </div>
    );
  }
}

export default News;
