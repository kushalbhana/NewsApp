import React, { Component } from 'react'


export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
        <img src={!imageUrl?"https://img.etimg.com/thumb/msid-100519842,width-1070,height-580,imgsize-829123,overlay-economictimes/photo.jpg":imageUrl} className="card-img-top" alt="https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"/>
        <div className="card-body">
          <h5 className="card-title">{title} ...</h5>
          <p className="card-text">{description} ...</p>
          <a rel="noreferer" href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
        
      </div>
    )
  }
}

export default NewsItem