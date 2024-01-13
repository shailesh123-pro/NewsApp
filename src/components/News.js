import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component"; {/**this is used for infinite scoll bar */ }

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    // pageSize: PropTypes,
    category: PropTypes.string,

  };

  articales = [];

  capitalizeFirstLetter = (string) => {
    {/**this function is used to change the first letter of name of the app */ }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articales: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`; {/**this is used to change the name of title category wise */ }
  }
  // async updateNews(){
  //   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=150f00797cb74d979822925fe704277b&page=&{this.state.page}&pageSize=${this.props.pageSize}`;{/**here i pass the category,pageSize and country as props. */}
  //   let data = await fetch(url);
  //   this.setState({loading:true})
  //   let parsedData = await data.json()
  //   console.log(parsedData)
  //   this.setState({articales: this.articales.concat(parsedData.articles),totalResults:parsedData.totalResults , loading: false})

  // }

  async componentDidMount() {
    this.props.setProgress(0);
    {/**this function is used for fetching the api from the given url */ }
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=150f00797cb74d979822925fe704277b&page=1&pageSize=${this.props.pageSize}`; {/**here i pass the category,pageSize and country as props. */ }
    let data = await fetch(url);
    this.setState({ loading: true })
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ articales: this.state.articales.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })
    this.props.setProgress(100);
  }
  handlePrevClick = async () => {
    {/**this function is used to handle the prev button  */ }
    console.log("Prev")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=150f00797cb74d979822925fe704277b&page= ${this.state.page - 1}&pageSize=${this.props.pageSize}`; {/**here i pass the category,pageSize and country as props. */ }
    let data = await fetch(url);
    this.setState({ loading: true }); {/**this is used for loading the page when you move to prev */ }
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ articales: this.articals.concat(parsedData.articales), loading: false, totalResults: parsedData.totalResults }); {/**this is used for setState */ }
    {/**this below syntax is used to move to prev page */ }
    if (this.state.page >= 1) {
      this.setState({ page: this.state.page - 1 });
    }
    console.log(this.state.page)
    {/**this is updated code lecture no-33 */ }
    //     if(this.state.page>1)
    // {
    //   this.setState({page: this.state.page -1})
    // }
    // this.updateNews();

  }

  handleNextClick = async () => {
    {/**this function is used to handle the next button  */ }
    console.log("Next")
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=150f00797cb74d979822925fe704277b&page= ${this.state.page + 1}&pageSize=${this.props.pageSize}`; {/**here i pass the category,pageSize and country as props. */ }
      let data = await fetch(url);
      this.setState({ loading: true }); {/**this is used for loading the page when you move to next */ }
      let parsedData = await data.json()
      console.log(parsedData)
      this.setState({ articales: this.articals.concat(parsedData.articales), loading: false, totalResults: parsedData.totalResults }); {/**this is setState in class by using this keyword */ }
      {/**this below logic is used for move to next page */ }
      if (this.state.page <= 1) {
        this.setState({ page: this.state.page + 1 });
      }
      console.log(this.state.page)
    }
    {/**this is updated code lecture no-33 */ }
    // this.setState({ page:this.state.page-1})
    // if(this.state.page<=1)
    // {
    //   this.setState({page: this.state.page +1})
    // }
    // this.updateNews();

  }

  fetchMoreData = async () => { //this function is used to load the news more this is js function i  used inside settimeout function to load the news after specific time
    // this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=150f00797cb74d979822925fe704277b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`; {/**here i pass the category,pageSize and country as props. */ }
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      articales: this.state.articales.concat(parsedData.articles),
      page: this.state.page + 1,
      loading: false
    })

  };


  render() {
    console.log("render")
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey -Top Headlines {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} *this syntax is used to display the spenner when loading is true */}

        <InfiniteScroll
          dataLength={this.state.articales.length}
          next={this.fetchMoreData}
          hasMore={this.state.articales.length != this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className='row'>
              {/* *this is js syntax */}
              {this.state.articales?.map((element, index) => {
                {

                return <div className='col-md-4' key={element.url}> {/**this is also the bootstrap property to create the column  as 4 by 4 */}
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                  Imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} /> {/**i import the newsItem inside the news.js component */}
                </div>
                }
              })}

            </div>
          </div>
        </InfiniteScroll>
      </>
      // these are two button are used as prev and next these two button are commented in lecture - 35 because now i adding the infinite scoll bar due to i dosn't required those buttons  
      //  <div className='container d-flex justify-content-between'> 
      //   <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button> *&larr this is used to display the arrow on prev 
      //   <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>  *this is used to display the arrow on next button 
      //   </div> 
    )
  }
}

export default News
