import React, {Fragment} from "react";
import { getArticles } from "./dataservice.js";
import {
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
} from "@material-ui/core";

class Articles extends React.Component {
  state = {
    articles: [],
    page: 0,
    isModelOpened: false,
  };
  timeInterval = null;
  scroll = null;

   componentDidMount() {
    this.getPosts(this.state.page);
    this.timeInterval = setInterval(this.getPosts, 10000);
    this.scroll = window.addEventListener('scroll', () => {

        if(this.scroll) {

            this.scroll.removeEventListener();
        } 
        this.handleScroll();
    
    })
  }

  getPosts = async () => {
    const resp = await getArticles(this.state.page);
    this.setState((prevState) => ({
      articles: [...prevState.articles, ...resp.data.hits],
      page: resp.data.page + 1,
    }));
    console.log(resp);
  };

  openModal = (index) => {
      this.setState({
        isModelOpened: true,
      })

  }
  handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        this.getPosts();
    } else return;
  }
  
  render() {
    return (
    <Fragment>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Url</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Author</TableCell>
            </TableRow>
            </TableHead>

            <TableBody>

            {this.state.articles.map((el, index) => {
            return (
                    <TableRow key={index}>
                        <TableCell align="right">{el.title}</TableCell>
                        <TableCell align="right">{el.url}</TableCell>
                        <TableCell align="right">{el.created_at}</TableCell>
                        <TableCell align="right">{el.author}</TableCell>
                </TableRow>

            );
            })}

            </TableBody>   
        </Table>
        
      </Fragment>

    );
  }
}
export default Articles;
