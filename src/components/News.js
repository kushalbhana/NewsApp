import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0f6537f206e489a9d84599acc223c42&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      loading: false,
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
    });
  }

  async updateNews(){
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=d0f6537f206e489a9d84599acc223c42&page=${
      this.state.page
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      loading: false,
      page: this.state.page,
      articles: parseddata.articles,
    });
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page -1
    })
    this.updateNews()
  };

  handleNextClick = async () => {
    this.setState({ loading: true });
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      this.setState({
        page: this.state.page + 1
      })
      this.updateNews()
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 style={{ margin: "20px 0px" }}>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row my-3">
          {!this.state.loading &&
            this.state.articles.map((element) => {
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
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            className="btn btn-dark"
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
