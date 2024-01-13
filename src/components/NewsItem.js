import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, Imageurl, newsUrl, author, date , source} = this.props; {/**this is i created the props , this is the syntax of propes in className= based component */ }
    return (
      <div className='my-3'>
        <div className="card"> {/**this is css by using the js object */}
        <div style={{display:'flex' , justifyContent:'flex-end',
                   position:'absolute',right:'0'}}>
        <span className=" badge rounded-pill bg-danger"> {source}</span>

        </div>
          <img src={!Imageurl ? "https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg" : Imageurl} className="card-img-top" alt="..." />
          {/* <img src= {Imageurl} className="card-img-top" alt="..."/> */}
          <div className="card-body">
            <h5 className="card-title">{title}   </h5> {/**this is title of the news */}
            <p className="card-text">{description}...</p>  {/**this is description of the news */}
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p> {/**this is the autor and date of the image */}
            <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>{/**target="_blank" is used to open the my artical in new rab */}
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
