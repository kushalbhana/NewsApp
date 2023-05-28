import React, { Component } from 'react'


export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-warning" style={{left: '85%', zIndex: 1}}>
          {source}
          <span class="visually-hidden">unread messages</span>
        </span>
        <img src={!imageUrl?"https://img.etimg.com/thumb/msid-100519842,width-1070,height-580,imgsize-829123,overlay-economictimes/photo.jpg":imageUrl} className="card-img-top" alt="https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"/>
        <div className="card-body">
          <h5 className="card-title">{title} ...</h5>
          <p className="card-text">{description} ...</p>
          <p className="card-text">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</p>
          <a rel="noreferer" href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
        
      </div>
    )
  }
}

export default NewsItem
